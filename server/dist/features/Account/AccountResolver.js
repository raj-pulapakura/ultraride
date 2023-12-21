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
const AccountEntity_1 = require("./AccountEntity");
const AccountGraphql_1 = require("./AccountGraphql");
const AccountGeneralResponse_1 = require("./objects/AccountGeneralResponse");
const argon2_1 = require("argon2");
const AccountRegisterInput_1 = require("./inputs/AccountRegisterInput");
const AccountLoginInput_1 = require("./inputs/AccountLoginInput");
const constants_1 = require("../../constants");
const AccountAdminLoginInput_1 = require("./inputs/AccountAdminLoginInput");
const uuid_1 = require("uuid");
const adminIsLoggedIn_1 = require("../../utils/adminIsLoggedIn");
let AccountResolver = class AccountResolver {
    accounts() {
        return AccountEntity_1.AccountEntity.find({});
    }
    async account(accountIdOrEmail) {
        const accountById = await AccountEntity_1.AccountEntity.findOne(accountIdOrEmail);
        if (accountById)
            return accountById;
        const accountByEmail = await AccountEntity_1.AccountEntity.findOne({
            where: { email: accountIdOrEmail },
        });
        if (accountByEmail)
            return accountByEmail;
        return null;
    }
    async register({ req }, createAccountInput) {
        const { firstName, lastName, email, password, role } = createAccountInput;
        const accountAlreadyExists = await AccountEntity_1.AccountEntity.findOne({
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
        const hashedPassword = await (0, argon2_1.hash)(password);
        const newAccount = await AccountEntity_1.AccountEntity.create({
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
    async me({ req }) {
        const { accountId } = req.session;
        if (!accountId)
            return null;
        const account = await AccountEntity_1.AccountEntity.findOne(accountId);
        if (!account)
            return null;
        return { account };
    }
    logout({ res }) {
        try {
            res.clearCookie(constants_1.AUTH_COOKIE);
            return true;
        }
        catch {
            return false;
        }
    }
    async login(accountLoginInput, { req }) {
        const { email, password } = accountLoginInput;
        const account = await AccountEntity_1.AccountEntity.findOne({ where: { email } });
        if (!account) {
            return {
                error: {
                    field: "email",
                    message: "a user with that email does not exists",
                    ufm: "Incorrect email. Please try again.",
                },
            };
        }
        const validPassword = await (0, argon2_1.verify)(account.password, password);
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
    async adminLogin({ redis, res }, adminLoginInput) {
        const { adminId, adminPassword } = adminLoginInput;
        if (adminId !== constants_1.env.ADMIN_ID || adminPassword !== constants_1.env.ADMIN_PASSWORD) {
            return false;
        }
        const sessionId = (0, uuid_1.v4)();
        redis.set(sessionId, JSON.stringify({ adminId, adminPassword }), (error, reply) => {
            if (error) {
                throw error;
            }
        });
        res.cookie("admin-cookie", sessionId, {
            httpOnly: true,
            maxAge: constants_1.TEN_YEARS,
            secure: false,
            sameSite: "lax",
        });
        return true;
    }
    adminMe({ req }) {
        return (0, adminIsLoggedIn_1.adminIsLoggedIn)(req);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [AccountGraphql_1.AccountGraphql])
], AccountResolver.prototype, "accounts", null);
__decorate([
    (0, type_graphql_1.Query)(() => AccountGraphql_1.AccountGraphql, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("accountIdOrEmail", () => type_graphql_1.ID))
], AccountResolver.prototype, "account", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AccountGeneralResponse_1.AccountGeneralResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("input", () => AccountRegisterInput_1.AccountRegisterInput))
], AccountResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Query)(() => AccountGeneralResponse_1.AccountGeneralResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)())
], AccountResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)())
], AccountResolver.prototype, "logout", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AccountGeneralResponse_1.AccountGeneralResponse),
    __param(0, (0, type_graphql_1.Arg)("input", () => AccountLoginInput_1.AccountLoginInput)),
    __param(1, (0, type_graphql_1.Ctx)())
], AccountResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("input", () => AccountAdminLoginInput_1.AccountAdminLoginInput))
], AccountResolver.prototype, "adminLogin", null);
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)())
], AccountResolver.prototype, "adminMe", null);
AccountResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AccountResolver);
exports.AccountResolver = AccountResolver;
