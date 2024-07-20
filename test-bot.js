const { Telegraf } = require('telegraf');
const bot = new Telegraf('7354693443:AAE7JUjpYYtAIedJM1lpLSwm8GyMrix5S9k');

bot.start((ctx) => ctx.reply('Bot is working!'));
bot.launch();

console.log('Bot is running...');
