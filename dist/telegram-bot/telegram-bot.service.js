"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const telegraf_1 = require("telegraf");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const schedule = tslib_1.__importStar(require("node-schedule"));
let TelegramBotService = class TelegramBotService {
    constructor(configService) {
        this.configService = configService;
        this.subscribers = [];
        this.botToken = this.configService.get('TELEGRAM_BOT_TOKEN') || '';
        if (!this.botToken) {
            throw new Error('Telegram bot token is not defined');
        }
        this.bot = new telegraf_1.Telegraf(this.botToken);
    }
    onModuleInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('Initializing Telegram bot...');
            this.bot.start((ctx) => {
                console.log(`Received /start from chat id: ${ctx.chat.id}`);
                ctx.reply('Welcome! Send /subscribe to get daily weather updates.');
            });
            this.bot.command('subscribe', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                console.log(`Received /subscribe from chat id: ${ctx.chat.id}`);
                yield this.subscribe(ctx.chat.id);
            }));
            this.bot.on('text', (ctx) => {
                console.log(`Received text: ${ctx.message.text} from chat id: ${ctx.chat.id}`);
            });
            this.bot.launch();
            console.log('Telegram bot launched successfully');
            this.scheduleDailyWeatherUpdate();
        });
    }
    sendMessage(chatId, text) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`Sending message to chat id: ${chatId} with text: ${text}`);
            try {
                yield this.bot.telegram.sendMessage(chatId, text);
            }
            catch (error) {
                console.error(`Failed to send message to chat id: ${chatId}`, error);
            }
        });
    }
    subscribe(chatId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`Subscribe command received from chat id: ${chatId}`);
            const chatIdStr = chatId.toString();
            if (!this.subscribers.includes(chatIdStr)) {
                this.subscribers.push(chatIdStr);
                yield this.sendMessage(chatIdStr, 'You have subscribed to daily weather updates!');
            }
            else {
                yield this.sendMessage(chatIdStr, 'You are already subscribed.');
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
            console.log(`Weather data fetched: ${JSON.stringify(data)}`);
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