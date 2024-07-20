"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const google_strategy_1 = require("./strategies/google.strategy");
let AdminModule = class AdminModule {
};
AdminModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [passport_1.PassportModule, config_1.ConfigModule],
        providers: [admin_service_1.AdminService, google_strategy_1.GoogleStrategy],
        controllers: [admin_controller_1.AdminController],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map