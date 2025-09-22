import 'dotenv/config';
import { ALLOWED_USERS } from './config/defaults.js';
import TelegramBot from 'node-telegram-bot-api';
import { createServer } from 'http';


const token = process.env.TOKEN
const bot = new TelegramBot(token, { polling: true });

// Healthcheck for Render
const PORT = 10000;
createServer((_, res) => res.end('OK'))
  .listen(PORT, () => console.log(`Dummy health-check server on :${PORT}`));

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const messageText = msg.text;

  console.log(senderId);
  
  if (ALLOWED_USERS.includes(senderId)) {
    switch (messageText) {
      case '/start':
        bot.sendMessage(chatId, 'Welcome!');
        break;
      default:
        bot.sendMessage(chatId, 'That command is not recognized.');
        break;
    }
  } else {
    bot.sendMessage(chatId, 'This user is not authorized to send messages to this bot!');
  }
});
