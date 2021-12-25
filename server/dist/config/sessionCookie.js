"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionCookieConfig = void 0;
const constants_1 = require("../constants");
exports.sessionCookieConfig = {
    httpOnly: true,
    secure: false,
    maxAge: constants_1.TEN_YEARS,
    sameSite: "lax",
};
