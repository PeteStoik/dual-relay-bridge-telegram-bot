const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR BOT TOKEN HERE';
const bot = new TelegramBot(token, {interval: 100, timeout: 20, polling: true});
bot.on("polling_error", console.log);
var chatAID = null;
var chatBID = null;
var relaying = false;
var forwarded = false;
var botuname = null;

bot.getMe().then(function (me) {
    botuname = me.username;
});

//MESSAGE LISTENER

bot.on('message', (msg) => {
  var NewMsg = "";

//RELAY COMMANDS

//START RELAY
  if (msg.text == ("/sr@" + botuname) || msg.text == "/sr") {


    if (chatAID != null && chatBID != null){
      relaying = true;
      bot.sendMessage(msg.chat.id, " Relaying set to " + relaying.toString() + " @" + msg.from.username + ".");
    } else if (chatAID == null && chatBID != null) {
      bot.sendMessage(msg.chat.id, " Feed A is not set " + "@" + msg.from.username + ". Connect it by typing /ca");
    } else if (chatAID != null && chatBID == null) {
      bot.sendMessage(msg.chat.id, " Feed B is not set " + "@" + msg.from.username + ". Connect it by typing /cb");
    } else {
      bot.sendMessage(msg.chat.id, " Neither Feed A, nor Feed B are set " + "@" + msg.from.username + ". Connect them by typing /ca in group A and /cb in group B");
    }
  }

//STOP RELAY

  if (msg.text == ("/cr@" + botuname) || msg.text == "/cr") {
    relaying = false;
    bot.sendMessage(msg.chat.id, " Relaying set to " + relaying.toString() + " @" + msg.from.username + ".");
  }

//SET FEED A

  if (msg.text == ("/ca@" + botuname) || msg.text == "/ca") {
    chatAID = msg.chat.id;
    chatAT = msg.chat.title;
    bot.sendMessage(chatAID, chatAT + " feed connected to Socket A " + " @" + msg.from.username + ".")
    if (chatAID == chatBID) {
      chatBID = null;
      chatBT = null;
      bot.sendMessage(chatAID, "Cannot relay between one group, so Feed B has been reset @" + msg.from.username + ". Please set Feed B to another group, by typing /cb.")
    };
  }

//SET FEED B

  if (msg.text == ("/cb@" + botuname) || msg.text == "/cb") {
    chatBID = msg.chat.id;
    chatBT = msg.chat.title;
    bot.sendMessage(chatBID, chatBT + " feed connected to Socket B " +  " @" + msg.from.username + ".")
    if (chatBID == chatAID) {
      chatAID = null;
      chatAT = null;
      bot.sendMessage(chatBID, "Cannot relay between one group, so Feed A has been reset @" + msg.from.username + ". Please set Feed A to another group, by typing /ca.")
    };
  }

//RELAY STATUS COMMANDS

//FEED A STATUS

  if (msg.text == ("/cas@" + botuname) || msg.text == "/cas") {
    if (chatAID != null) {
    bot.sendMessage(msg.chat.id, " Feed A is: " + chatAT + " with ID: " + chatAID + " @" + msg.from.username + ".");
  } else {
    bot.sendMessage(msg.chat.id, " Feed A is not set " + "@" + msg.from.username + ".");
  }
  }

//FEED B STATUS

  if (msg.text == ("/cbs@" + botuname) || msg.text == "/cbs") {
    if (chatBID != null) {
    bot.sendMessage(msg.chat.id, " Feed B is: " + chatBT + " with ID: " + chatBID + " @" + msg.from.username + ".");
  } else {
    bot.sendMessage(msg.chat.id, " Feed B is not set " + "@" + msg.from.username + ".");
  }
  }

//RELAY STATUS

  if (msg.text == ("/rs@" + botuname) || msg.text == "/rs") {
    bot.sendMessage(msg.chat.id, " Relaying set to " + relaying.toString() + " @" + msg.from.username + ".");
  }

//HELP

  if (msg.text == ("/help@" + botuname) || msg.text == "/help") {
    bot.sendMessage(msg.chat.id, " I am a bot that links two groups together to relay messages from one to the other and vice versa. To begin message relay connect group A, by typing /ca, group B by typing /cb and then type /sr to start the relay." + " @" + msg.from.username + ".");
  }

  //CHECK IF NOT MEDIA

  if (msg.text != null && msg.media_group_id == null){

  //PREVENT RELAY OF BOT COMMANDS

  if (msg.text.startsWith ("/")) {
    nospecial = false;
  } else {
    nospecial = true;
  }

  //CHECK IF FORWARDED

  if (msg.forward_from != null) {
    forwarded = true;
  } else {
    forwarded = false;
  }

//RELAY MESSAGE FROM A TO B

  if (msg.chat.id == chatAID && relaying && nospecial && !forwarded && msg.text.length < (4092 - chatAT.length - msg.from.username.length)) {

//ENSURE CORRECT ORDER WITH TIMEOUT

  setTimeout(() => {
    bot.sendMessage(chatBID, chatAT.substr(0,15) + " | " + msg.from.username + ": " + msg.text.toString(NewMsg));
  }, 200);

//FORWARD IF FORWARDED

} else if (msg.chat.id == chatAID && relaying && nospecial && forwarded) {
  bot.sendMessage(chatBID, chatAT.substr(0,15) + " | " + msg.from.username + " forwarded: ");
  setTimeout(() => {
          bot.forwardMessage(chatBID, chatAID, msg.message_id);
  }, 100);

//FORWARD IF TOO LONG

} else if (msg.chat.id == chatAID && relaying && nospecial && !forwarded && msg.text.length >= (4092 - chatAT.length - msg.from.username.length)) {
  bot.sendMessage(chatBID, chatAT.substr(0,15) + " | " + msg.from.username + " sent: ");
  setTimeout(() => {
          bot.forwardMessage(chatBID, chatAID, msg.message_id);
  }, 100);
}

//RELAY MESSAGE FROM B TO A

  if (msg.chat.id == chatBID && relaying && nospecial && !forwarded && msg.text.length < (4092 - chatBT.length - msg.from.username.length)) {

//ENSURE CORRECT ORDER WITH TIMEOUT

    setTimeout(() => {
      bot.sendMessage(chatAID, chatBT.substr(0,15) + " | " + msg.from.username + ": " + msg.text.toString(NewMsg));
    }, 200);

//FORWARD IF FORWARDED

  } else if (msg.chat.id == chatBID && relaying && nospecial && forwarded) {
    bot.sendMessage(chatAID, chatBT.substr(0,15) + " | " + msg.from.username + " forwarded: ");
    setTimeout(() => {
          bot.forwardMessage(chatAID, chatBID, msg.message_id);
  }, 100);

//FORWARD IF TOO LONG

} else if (msg.chat.id == chatBID && relaying && nospecial && !forwarded && msg.text.length >= (4092 - chatBT.length - msg.from.username.length)) {
  bot.sendMessage(chatAID, chatBT.substr(0,15) + " | " + msg.from.username + " sent: ");
  setTimeout(() => {
        bot.forwardMessage(chatAID, chatBID, msg.message_id);
}, 100);
}
} else {

//FORWARD FROM A TO B IF MESSAGE CONTAINS MEDIA

  if (msg.chat.id == chatAID && relaying) {
    bot.sendMessage(chatBID, chatAT.substr(0,15) + " | " + msg.from.username + " sent: ");
    setTimeout(() => {
          bot.forwardMessage(chatBID, chatAID, msg.message_id);
  }, 100);
  }

//FORWARD FROM B TO A IF MESSAGE CONTAINS MEDIA

  if (msg.chat.id == chatBID && relaying) {
  bot.sendMessage(chatAID, chatBT.substr(0,15) + " | " + msg.from.username + " sent: ");
  setTimeout(() => {
      bot.forwardMessage(chatAID, chatBID, msg.message_id);
  }, 100);
  }
}
});
