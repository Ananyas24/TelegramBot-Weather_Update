import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './telegram.service';
import { WeatherService } from '../weather/weather.service';

@Module({
  imports: [ConfigModule],
  providers: [TelegramService, WeatherService],
})
export class TelegramModule {}
