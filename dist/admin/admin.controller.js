"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const admin_service_1 = require("./admin.service");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    googleAuth(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () { });
    }
    googleAuthRedirect(req) {
        return { message: 'Logged in with Google', user: req.user };
    }
    getSettings() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.adminService.getSettings();
        });
    }
    updateSettings(settings) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.adminService.updateSettings(settings);
        });
    }
    getUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.adminService.getUsers();
        });
    }
    blockUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.adminService.blockUser(userId);
        });
    }
    deleteUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.adminService.deleteUser(userId);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminController.prototype, "googleAuth", null);
tslib_1.__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AdminController.prototype, "googleAuthRedirect", null);
tslib_1.__decorate([
    (0, common_1.Get)('settings'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AdminController.prototype, "getSettings", null);
tslib_1.__decorate([
    (0, common_1.Post)('settings'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminController.prototype, "updateSettings", null);
tslib_1.__decorate([
    (0, common_1.Get)('users'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AdminController.prototype, "getUsers", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/block'),
    tslib_1.__param(0, (0, common_1.Body)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminController.prototype, "blockUser", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/delete'),
    tslib_1.__param(0, (0, common_1.Body)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
AdminController = tslib_1.__decorate([
    (0, common_1.Controller)('admin'),
    tslib_1.__metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map