import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramService } from './telegram/telegram.service';
import * as cron from 'node-cron';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const telegramService = app.get(TelegramService);

  // Schedule a task to run at 8:00 AM every day
  cron.schedule('0 8 * * *', () => {
    telegramService.sendDailyUpdates();
  });

  await app.listen(3005);
}
bootstrap();
