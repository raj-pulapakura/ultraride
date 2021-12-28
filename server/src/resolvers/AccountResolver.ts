import { Arg, Query, Resolver, ID, Mutation, Ctx } from "type-graphql";
import { Account } from "../entities/Account";
import { AccountResponse } from "../objects/Account/AccountResponse";
import { DummyResponse } from "../objects/DummyResponse";
import { hash, verify } from "argon2";
import { AccountInput } from "../objects/Account/AccountInput";
import { Context } from "../types";
import { AccountLoginInput } from "../objects/Account/AccountLoginInput";
import { AUTH_COOKIE } from "../constants";

@Resolver()
export class AccountResolver {
  @Query(() => DummyResponse)
  test(): DummyResponse {
    return {
      message: "everything is working!",
    };
  }

  @Query(() => [Account])
  accounts(): Promise<Account[]> {
    return Account.find({});
  }

  @Query(() => Account, { nullable: true })
  async account(
    @Arg("accountIdOrEmail", () => ID) accountIdOrEmail: string
  ): Promise<Account | null> {
    const accountById = await Account.findOne(accountIdOrEmail);
    if (accountById) return accountById;

    const accountByEmail = await Account.findOne({
      where: { email: accountIdOrEmail },
    });
    if (accountByEmail) return accountByEmail;

    return null;
  }

  @Mutation(() => AccountResponse, { nullable: true })
  async createAccount(
    @Ctx() { req }: Context,
    @Arg("input", () => AccountInput)
    createAccountInput: AccountInput
  ): Promise<AccountResponse> {
    const { firstName, lastName, email, password, role } = createAccountInput;

    const accountAlreadyExists = await Account.findOne({ where: { email } });
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
    const newAccount = await Account.create({
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

  @Query(() => AccountResponse, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<AccountResponse | null> {
    const { accountId } = req.session;
    if (!accountId) return null;
    const account = await Account.findOne(accountId);
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

  @Mutation(() => AccountResponse)
  async login(
    @Arg("input", () => AccountLoginInput) accountLoginInput: AccountLoginInput,
    @Ctx() { req }: Context
  ): Promise<AccountResponse> {
    const { email, password } = accountLoginInput;
    const account = await Account.findOne({ where: { email } });
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

  @Mutation(() => AccountResponse)
  async adminLogin(): Promise<AccountResponse | null> {
    return null;
  }
}
