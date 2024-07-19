import { ConfigService } from '@nestjs/config';
export declare class WeatherService {
    private configService;
    constructor(configService: ConfigService);
    getWeather(): Promise<string>;
}
