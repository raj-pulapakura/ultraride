import { Arg, Query, Resolver, ID, Mutation } from "type-graphql";
import { Account } from "../entities/Account";
import { AccountResponse } from "../objects/Account/AccountResponse";
import { DummyResponse } from "../objects/DummyResponse";
import { hash } from "argon2";
import { AccountInput } from "../objects/Account/AccountInput";

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
    return {
      account: newAccount,
    };
  }
}
