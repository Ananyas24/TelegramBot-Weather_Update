"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const telegram_bot_service_1 = require("./telegram-bot.service");
let TelegramBotModule = class TelegramBotModule {
};
TelegramBotModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [telegram_bot_service_1.TelegramBotService],
        exports: [telegram_bot_service_1.TelegramBotService],
    })
], TelegramBotModule);
exports.TelegramBotModule = TelegramBotModule;
//# sourceMappingURL=telegram-bot.module.js.map