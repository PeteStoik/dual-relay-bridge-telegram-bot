# dual-relay-bridge-telegram-bot
Links two Telegram groups and forward messages between the two as if one single group. 

**REQUIREMENTS**
1) Telegram bot API token
2) Bot hosting environment (can be your PC)
3) Node.js

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
12) Type /ca in the first group to connect it to the bot
13) Type /cb in the second gorup to connect it to the bot
14) Type /sr to begin relay transmission
15) Type /cr to stop relay transmission
