"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Account_1 = require("../entities/Account");
const AccountResponse_1 = require("../objects/account/AccountResponse");
const DummyResponse_1 = require("../objects/general/DummyResponse");
const argon2_1 = require("argon2");
const CreateAccountInput_1 = require("../objects/account/CreateAccountInput");
let AccountResolver = class AccountResolver {
    test() {
        return {
            message: "everything is working!",
        };
    }
    accounts() {
        return Account_1.Account.find({});
    }
    async account(accountIdOrEmail) {
        const accountById = await Account_1.Account.findOne(accountIdOrEmail);
        if (accountById)
            return accountById;
        const accountByEmail = await Account_1.Account.findOne({
            where: { email: accountIdOrEmail },
        });
        if (accountByEmail)
            return accountByEmail;
        return null;
    }
    async createAccount(createAccountInput) {
        const { firstName, lastName, email, password, role } = createAccountInput;
        const accountAlreadyExists = await Account_1.Account.findOne({ where: { email } });
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
        const hashedPassword = await (0, argon2_1.hash)(password);
        const newAccount = await Account_1.Account.create({
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
};
__decorate([
    (0, type_graphql_1.Query)(() => DummyResponse_1.DummyResponse)
], AccountResolver.prototype, "test", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Account_1.Account])
], AccountResolver.prototype, "accounts", null);
__decorate([
    (0, type_graphql_1.Query)(() => Account_1.Account, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("accountIdOrEmail", () => type_graphql_1.ID))
], AccountResolver.prototype, "account", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AccountResponse_1.AccountResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("input", () => CreateAccountInput_1.CreateAccountInput))
], AccountResolver.prototype, "createAccount", null);
AccountResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AccountResolver);
exports.AccountResolver = AccountResolver;
