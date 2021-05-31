const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR BOT TOKEN HERE';
const bot = new TelegramBot(token, {interval: 100, timeout: 20, polling: true});
bot.on("polling_error", console.log);
var chatAID = null;
var chatBID = null;
var relaying = false;


//COMMANDS

bot.onText(/\/sr/, (msg) => {
relaying = true;
bot.sendMessage(msg.chat.id, " Relaying set to " + relaying.toString() + " @" + msg.from.username + ".");
});

bot.onText(/\/cr/, (msg) => {
relaying = false;
bot.sendMessage(msg.chat.id, " Relaying set to " + relaying.toString() + " @" + msg.from.username + ".");
});

bot.onText(/\/ca/, (msg) => {
chatAID = msg.chat.id;
chatAT = msg.chat.title;
bot.sendMessage(chatAID, chatAT + " Feed Connected to Socket A " + " @" + msg.from.username + ".");
});

bot.onText(/\/cb/, (msg) => {
chatBID = msg.chat.id;
chatBT = msg.chat.title;
bot.sendMessage(chatBID, chatBT + " Feed Connected to Socket B " +  " @" + msg.from.username + ".");
});

//RELAY TRANSMISSION

bot.on('message', (msg) => {
  var NewMsg = "";

  if (msg.text.includes ("/")) {
    nospecial = false;
  } else {
    nospecial = true;
  }
  if (msg.chat.id == chatAID && relaying && nospecial) {
    bot.sendMessage(chatBID, chatAT.substr(0,9) + " | " + msg.from.username + ": " + msg.text.toString(NewMsg));
}
  if (msg.chat.id == chatBID && relaying && nospecial) {
    bot.sendMessage(chatAID, chatBT.substr(0,9) + " | " + msg.from.username + ": " + msg.text.toString(NewMsg));
  }
});
