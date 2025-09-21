const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = '8025245630:AAFROgo4E5lbAnPgrkGsXXEjfkcbtFDjp_U';
const bot = new TelegramBot(token, { polling: true });

const PORT = process.env.PORT || 10000;
require('http')
  .createServer((_, res) => res.end('OK'))
  .listen(PORT, () => console.log(`Dummy health-check server on :${PORT}`));

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === '/start') {
    bot.sendMessage(chatId, 'Welcome to the bot!');
  }
});
