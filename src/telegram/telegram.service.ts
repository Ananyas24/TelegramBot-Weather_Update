import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class TelegramService {
  private bot: Telegraf;
  private readonly logger = new Logger(TelegramService.name);
  private subscribers: Set<number> = new Set();

  constructor(
    private configService: ConfigService,
    private weatherService: WeatherService,
  ) {
    const token = this.configService.get<string>('TELEGRAM_TOKEN');
    this.bot = new Telegraf(token);
    this.bot.start((ctx) => ctx.reply('Welcome! Use /subscribe to get daily weather updates.'));
    this.bot.command('subscribe', (ctx) => this.handleSubscribe(ctx));
    this.bot.launch();
  }

  private async handleSubscribe(ctx): Promise<void> {
    const chatId = ctx.message.chat.id;
    this.subscribers.add(chatId);
    const weather = await this.weatherService.getWeather();
    await ctx.reply(`You've subscribed to daily weather updates.\nToday's weather: ${weather}`);
  }

  public async sendDailyUpdates(): Promise<void> {
    const weather = await this.weatherService.getWeather();
    for (const chatId of this.subscribers) {
      this.bot.telegram.sendMessage(chatId, `Today's weather: ${weather}`);
    }
  }
}
