"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AdminService = class AdminService {
    constructor() {
        this.settings = {
            weatherApiKey: process.env.WEATHER_API_KEY,
            telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
        };
        this.users = [];
    }
    getSettings() {
        return this.settings;
    }
    updateSettings(newSettings) {
        this.settings = Object.assign(Object.assign({}, this.settings), newSettings);
        return this.settings;
    }
    getUsers() {
        return this.users;
    }
    blockUser(userId) {
        const user = this.users.find((u) => u.id === userId);
        if (user) {
            user.blocked = true;
            return { message: 'User blocked successfully' };
        }
        return { message: 'User not found' };
    }
    deleteUser(userId) {
        this.users = this.users.filter((u) => u.id !== userId);
        return { message: 'User deleted successfully' };
    }
};
AdminService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map