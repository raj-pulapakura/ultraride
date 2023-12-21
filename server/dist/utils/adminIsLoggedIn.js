"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminIsLoggedIn = void 0;
const adminIsLoggedIn = (req) => {
    return req.session.adminLoggedIn;
};
exports.adminIsLoggedIn = adminIsLoggedIn;
