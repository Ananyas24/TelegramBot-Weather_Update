"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_fetch_1 = require("node-fetch");
const schedule = require("node-schedule");
let TelegramBotService = class TelegramBotService {
    constructor(configService) {
        this.configService = configService;
        this.botToken = '';
        this.subscribers = [];
    }
    onModuleInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = this.configService.get('TELEGRAM_BOT_TOKEN');
            if (token) {
                this.botToken = token;
                this.scheduleDailyWeatherUpdate();
            }
            else {
                throw new Error('Telegram bot token is not defined');
            }
        });
    }
    sendMessage(chatId, text) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
            yield (0, node_fetch_1.default)(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chat_id: chatId, text }),
            });
        });
    }
    subscribe(chatId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.subscribers.includes(chatId)) {
                this.subscribers.push(chatId);
                yield this.sendMessage(chatId, 'You have subscribed to daily weather updates!');
            }
            else {
                yield this.sendMessage(chatId, 'You are already subscribed.');
            }
        });
    }
    scheduleDailyWeatherUpdate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            schedule.scheduleJob('* * * * *', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const weather = yield this.getWeather();
                this.subscribers.forEach((chatId) => {
                    this.sendMessage(chatId, `Today's weather: ${weather}`);
                });
            }));
        });
    }
    getWeather() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const apiKey = this.configService.get('WEATHER_API_KEY');
            const response = yield (0, node_fetch_1.default)(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`);
            const data = yield response.json();
            return `Temperature: ${data.main.temp}°C, Condition: ${data.weather[0].description}`;
        });
    }
};
TelegramBotService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
], TelegramBotService);
exports.TelegramBotService = TelegramBotService;
//# sourceMappingURL=telegram-bot.service.js.map