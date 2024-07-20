"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotService = void 0;
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
    async onModuleInit() {
        const token = this.configService.get('TELEGRAM_BOT_TOKEN');
        if (token) {
            this.botToken = token;
            this.scheduleDailyWeatherUpdate();
        }
        else {
            throw new Error('Telegram bot token is not defined');
        }
    }
    async sendMessage(chatId, text) {
        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        await (0, node_fetch_1.default)(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chat_id: chatId, text }),
        });
    }
    async subscribe(chatId) {
        if (!this.subscribers.includes(chatId)) {
            this.subscribers.push(chatId);
            await this.sendMessage(chatId, 'You have subscribed to daily weather updates!');
        }
        else {
            await this.sendMessage(chatId, 'You are already subscribed.');
        }
    }
    async scheduleDailyWeatherUpdate() {
        schedule.scheduleJob('* * * * *', async () => {
            const weather = await this.getWeather();
            this.subscribers.forEach((chatId) => {
                this.sendMessage(chatId, `Today's weather: ${weather}`);
            });
        });
    }
    async getWeather() {
        const apiKey = this.configService.get('WEATHER_API_KEY');
        const response = await (0, node_fetch_1.default)(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return `Temperature: ${data.main.temp}°C, Condition: ${data.weather[0].description}`;
    }
};
TelegramBotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TelegramBotService);
exports.TelegramBotService = TelegramBotService;
//# sourceMappingURL=telegram-bot.service.js.map