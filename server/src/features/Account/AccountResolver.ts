import { Arg, Query, Resolver, ID, Mutation, Ctx } from "type-graphql";
import { AccountEntity } from "./AccountEntity";
import { AccountGraphql } from "./AccountGraphql";
import { AccountGeneralResponse } from "./objects/AccountGeneralResponse";
import { hash, verify } from "argon2";
import { AccountRegisterInput } from "./inputs/AccountRegisterInput";
import { Context } from "../../types";
import { AccountLoginInput } from "./inputs/AccountLoginInput";
import { AUTH_COOKIE, env, TEN_YEARS } from "../../constants";
import { AccountAdminLoginInput } from "./inputs/AccountAdminLoginInput";
import { v4 as uuid } from "uuid";
import { adminIsLoggedIn } from "../../utils/adminIsLoggedIn";

@Resolver()
export class AccountResolver {
  @Query(() => [AccountGraphql])
  accounts(): Promise<AccountGraphql[]> {
    return AccountEntity.find({});
  }

  @Query(() => AccountGraphql, { nullable: true })
  async account(
    @Arg("accountIdOrEmail", () => ID) accountIdOrEmail: string
  ): Promise<AccountGraphql | null> {
    const accountById = await AccountEntity.findOne(accountIdOrEmail);
    if (accountById) return accountById;

    const accountByEmail = await AccountEntity.findOne({
      where: { email: accountIdOrEmail },
    });
    if (accountByEmail) return accountByEmail;

    return null;
  }

  @Mutation(() => AccountGeneralResponse, { nullable: true })
  async register(
    @Ctx() { req }: Context,
    @Arg("input", () => AccountRegisterInput)
    createAccountInput: AccountRegisterInput
  ): Promise<AccountGeneralResponse> {
    const { firstName, lastName, email, password, role } = createAccountInput;

    const accountAlreadyExists = await AccountEntity.findOne({
      where: { email },
    });
    if (accountAlreadyExists) {
      return {
        error: {
          field: "email",
          message: "a user with that email already exists",
          ufm: "A user with that email already exists. Please enter a different one.",
        },
      };
    }

    if (password.length < 6) {
      return {
        error: {
          field: "password",
          message: "password must be a least six characters long",
          ufm: "Please enter a password with at least 6 characters.",
        },
      };
    }

    const hashedPassword = await hash(password);
    const newAccount = await AccountEntity.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    }).save();

    req.session.accountId = newAccount.id;

    return {
      account: newAccount,
    };
  }
 
  @Query(() => AccountGeneralResponse, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<AccountGeneralResponse | null> {
    const { accountId, adminLoggedIn } = req.session;
    if (!accountId) return null;
    const account = await AccountEntity.findOne(accountId);
    if (!account) return null;
    return { account };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { res }: Context): Boolean {
    try {
      res.clearCookie(AUTH_COOKIE);
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => AccountGeneralResponse)
  async login(
    @Arg("input", () => AccountLoginInput) accountLoginInput: AccountLoginInput,
    @Ctx() { req }: Context
  ): Promise<AccountGeneralResponse> {
    const { email, password } = accountLoginInput;
    const account = await AccountEntity.findOne({ where: { email } });
    if (!account) {
      return {
        error: {
          field: "email",
          message: "a user with that email does not exists",
          ufm: "Incorrect email. Please try again.",
        },
      };
    }

    const validPassword = await verify(account.password, password);
    if (!validPassword) {
      return {
        error: {
          field: "password",
          message: "a user with that password does not exist",
          ufm: "Incorrect password. Please try again",
        },
      };
    }

    req.session.accountId = account.id;
    return { account };
  }

  @Mutation(() => Boolean)
  async adminLogin(
    @Ctx() { redis, res }: Context,
    @Arg("input", () => AccountAdminLoginInput)
    adminLoginInput: AccountAdminLoginInput
  ): Promise<Boolean> {
    const { adminId, adminPassword } = adminLoginInput;

    if (adminId !== env.ADMIN_ID || adminPassword !== env.ADMIN_PASSWORD) {
      return false;
    }

    const sessionId = uuid();

    redis.set(
      sessionId,
      JSON.stringify({ adminId, adminPassword }),
      (error, reply) => {
        if (error) {
          throw error;
        }
      }
    );

    res.cookie("admin-cookie", sessionId, {
      httpOnly: true,
      maxAge: TEN_YEARS,
      secure: false,
      sameSite: "lax",
    });

    return true;
  }

  @Query(() => Boolean)
  adminMe(@Ctx() { req }: Context) {
    return adminIsLoggedIn(req);
  }
}
