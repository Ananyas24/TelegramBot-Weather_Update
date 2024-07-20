import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import fetch from 'node-fetch';
import * as schedule from 'node-schedule';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private botToken: string;
  private bot: Telegraf;
  private subscribers: string[] = [];

  constructor(private configService: ConfigService) {
    this.botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN') || '';
    if (!this.botToken) {
      throw new Error('Telegram bot token is not defined');
    }

    this.bot = new Telegraf(this.botToken);
  }

  async onModuleInit() {
    console.log('Initializing Telegram bot...');

    // Command handlers
    this.bot.start((ctx) => {
      console.log(`Received /start from chat id: ${ctx.chat.id}`);
      ctx.reply('Welcome! Send /subscribe to get daily weather updates.');
    });

    this.bot.command('subscribe', async (ctx) => {
      console.log(`Received /subscribe from chat id: ${ctx.chat.id}`);
      await this.subscribe(ctx.chat.id);
    });

    // Generic handler to log all text messages
    this.bot.on('text', (ctx) => {
      console.log(`Received text: ${ctx.message.text} from chat id: ${ctx.chat.id}`);
    });

    this.bot.launch();
    console.log('Telegram bot launched successfully');

    this.scheduleDailyWeatherUpdate();
  }

  private async sendMessage(chatId: string, text: string) {
    console.log(`Sending message to chat id: ${chatId} with text: ${text}`);
    try {
      await this.bot.telegram.sendMessage(chatId, text);
    } catch (error) {
      console.error(`Failed to send message to chat id: ${chatId}`, error);
    }
  }

  private async subscribe(chatId: number) {
    console.log(`Subscribe command received from chat id: ${chatId}`);
    const chatIdStr = chatId.toString();
    if (!this.subscribers.includes(chatIdStr)) {
      this.subscribers.push(chatIdStr);
      await this.sendMessage(chatIdStr, 'You have subscribed to daily weather updates!');
    } else {
      await this.sendMessage(chatIdStr, 'You are already subscribed.');
    }
  }

  private async scheduleDailyWeatherUpdate() {
    schedule.scheduleJob('* * * * *', async () => {
      const weather = await this.getWeather();
      this.subscribers.forEach((chatId) => {
        this.sendMessage(chatId, `Today's weather: ${weather}`);
      });
    });
  }

  private async getWeather(): Promise<string> {
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`);
    const data = await response.json();
    console.log(`Weather data fetched: ${JSON.stringify(data)}`);
    return `Temperature: ${data.main.temp}°C, Condition: ${data.weather[0].description}`;
  }
}
