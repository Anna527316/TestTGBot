const TelegramBot = require('node-telegram-bot-api');

const token = '8025245630:AAFROgo4E5lbAnPgrkGsXXEjfkcbtFDjp_U';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === '/start') {
    bot.sendMessage(chatId, 'Welcome to the bot!');
  }
});
