import { ConfigService } from '@nestjs/config';
import { WeatherService } from '../weather/weather.service';
export declare class TelegramService {
    private configService;
    private weatherService;
    private bot;
    private readonly logger;
    private subscribers;
    constructor(configService: ConfigService, weatherService: WeatherService);
    private handleSubscribe;
    sendDailyUpdates(): Promise<void>;
}
