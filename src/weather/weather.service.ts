import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
  constructor(private configService: ConfigService) {}

  async getWeather(): Promise<string> {
    const apiKey = this.configService.get<string>('OPENWEATHERMAP_API_KEY');
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`);
    const data = response.data;
    return `Temperature: ${data.main.temp}°C, ${data.weather[0].description}`;
  }
}
