import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class TelegramBotService implements OnModuleInit {
    private configService;
    private botToken;
    private bot;
    private subscribers;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    private sendMessage;
    private subscribe;
    private scheduleDailyWeatherUpdate;
    private getWeather;
}
