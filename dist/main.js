"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const telegram_service_1 = require("./telegram/telegram.service");
const cron = require("node-cron");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const telegramService = app.get(telegram_service_1.TelegramService);
    cron.schedule('0 8 * * *', () => {
        telegramService.sendDailyUpdates();
    });
    await app.listen(3005);
}
bootstrap();
//# sourceMappingURL=main.js.map