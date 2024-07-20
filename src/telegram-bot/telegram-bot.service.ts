import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import * as schedule from 'node-schedule';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private botToken: string = '';
  private subscribers: string[] = [];

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (token) {
      this.botToken = token;
      this.scheduleDailyWeatherUpdate();
    } else {
      throw new Error('Telegram bot token is not defined');
    }
  }

  private async sendMessage(chatId: string, text: string) {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  }

  private async subscribe(chatId: string) {
    if (!this.subscribers.includes(chatId)) {
      this.subscribers.push(chatId);
      await this.sendMessage(chatId, 'You have subscribed to daily weather updates!');
    } else {
      await this.sendMessage(chatId, 'You are already subscribed.');
    }
  }

  private async scheduleDailyWeatherUpdate() {
    // For testing, set a more frequent schedule, e.g., every minute
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
    return `Temperature: ${data.main.temp}°C, Condition: ${data.weather[0].description}`;
  }
}
