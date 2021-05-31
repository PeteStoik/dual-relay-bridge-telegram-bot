# Group Bridge: Message Relay Telegram Bot
Links two Telegram groups and relays messages between the two as if one single group. Will display user name and group name in the message.

**REQUIREMENTS**
1) Node.js
2) Telegram bot from @BotFather

**INSTALLATION**
1) Download all files
2) Extract to preferred hosting folder
3) Launch Telegram and start a conversation with @BotFather
4) Create a new bot by following the instructions and copy the API key
5) Visit the folder you extracted the bot files to and open index.js
6) Locate the line containing "const token = 'YOUR BOT TOKEN HERE';"
7) Replace 'YOUR BOT TOKEN HERE' with your Bot API token like const token = 'abcdef-123456abcdef'
8) Open Command Prompt, or other command interface you might have and navigate to the bot folder
9) Type node index.js and press enter
10) Your bot is now running
11) Add the bot you created to the two groups you want to link
12) Check the next section to display command preview

**DISPLAY COMMANDS PREVIEW**
1) Go to the @BotFather
2) Type /mybots
3) Select your Group Bridge bot
4) Click Edit Bot
5) Click Edit Commands
6) Input the list below as one message and hit enter:

help - Display information on how to use this bot.
ca - Connect message feed from Group 1 to Socket A.
cas - Check which group Socket A is connected to.
cb - Connect message feed from Group 2 to Socket B.
cbs - Check which group Socket B is connected to.
sr - Start message relay between plugged Channels A & B
cr - Cut message relay between plugged Channels A & B
rs - Check if the relay is on or off

**CHAT COMMANDS**

/help - Display information on how to use this bot.
/ca - Connect message feed from Group 1 to Socket A.
/cas - Check which group Socket A is connected to.
/cb - Connect message feed from Group 2 to Socket B.
/cbs - Check which group Socket B is connected to.
/sr - Start message relay between plugged Channels A & B
/cr - Cut message relay between plugged Channels A & B
/rs - Check if the relay is on or off

