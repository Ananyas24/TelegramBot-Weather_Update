import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  blocked?: boolean;
}

@Injectable()
export class AdminService {
  private settings = {
    weatherApiKey: process.env.WEATHER_API_KEY,
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  };

  private users: User[] = [];

  getSettings() {
    return this.settings;
  }

  updateSettings(newSettings: any) {
    this.settings = { ...this.settings, ...newSettings };
    return this.settings;
  }

  getUsers(): User[] {
    return this.users;
  }

  blockUser(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.blocked = true;
      return { message: 'User blocked successfully' };
    }
    return { message: 'User not found' };
  }

  deleteUser(userId: string) {
    this.users = this.users.filter((u) => u.id !== userId);
    return { message: 'User deleted successfully' };
  }
}
