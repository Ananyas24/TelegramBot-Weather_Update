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
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const telegraf_1 = require("telegraf");
const weather_service_1 = require("../weather/weather.service");
let TelegramService = TelegramService_1 = class TelegramService {
    constructor(configService, weatherService) {
        this.configService = configService;
        this.weatherService = weatherService;
        this.logger = new common_1.Logger(TelegramService_1.name);
        this.subscribers = new Set();
        const token = this.configService.get('TELEGRAM_TOKEN');
        this.bot = new telegraf_1.Telegraf(token);
        this.bot.start((ctx) => ctx.reply('Welcome! Use /subscribe to get daily weather updates.'));
        this.bot.command('subscribe', (ctx) => this.handleSubscribe(ctx));
        this.bot.launch();
    }
    async handleSubscribe(ctx) {
        const chatId = ctx.message.chat.id;
        this.subscribers.add(chatId);
        const weather = await this.weatherService.getWeather();
        await ctx.reply(`You've subscribed to daily weather updates.\nToday's weather: ${weather}`);
    }
    async sendDailyUpdates() {
        const weather = await this.weatherService.getWeather();
        for (const chatId of this.subscribers) {
            this.bot.telegram.sendMessage(chatId, `Today's weather: ${weather}`);
        }
    }
};
TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        weather_service_1.WeatherService])
], TelegramService);
exports.TelegramService = TelegramService;
//# sourceMappingURL=telegram.service.js.map