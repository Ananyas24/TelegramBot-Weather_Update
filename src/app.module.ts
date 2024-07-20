import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegramBotModule,
    AdminModule,
  ],
})
export class AppModule {}
