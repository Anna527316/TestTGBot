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

// BOT BEHAVIOUR

// Message event
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const senderName = msg.from.first_name;
  const messageText = msg.text;
  
  if (ALLOWED_USERS.includes(senderId)) {

    // Commands
    switch (messageText) {

      case '/start':
        bot.sendMessage(chatId, `Welcome, ${senderName}!`);
        break;

      case '/help':
        const helpText = "This is a bot for testing purposes. \n\nCommands:\n/start : Start the bot\n/help: Get a list of the bot's commands and how to use them\n/wave : Get a 'Hello!' from the bot"
        bot.sendMessage(chatId, helpText);
        break;

      case '/wave':
        bot.sendMessage(chatId, 'Hello!');
        break;
      
      default:
        bot.sendMessage(chatId, 'That command is not recognized.');
        break;

    }
  } else {
    bot.sendMessage(chatId, 'This user is not authorized to send messages to this bot!');
  }
});
