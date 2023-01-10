require('dotenv').config();

const {Client, IntentsBitField} = require('discord.js');
const {ask} = require('./ai.js')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log('The bot is ready');
});

client.on('messageCreate', async (message) =>{
    if(message.author.bot){
        return;
    }

    if(message.content === 'ping'){
        message.reply('pong');
    }

    if(message.content.substring(0,1) === "!"){
        const prompt = message.content.substring(1);
        const answer = await ask(prompt);
        message.reply(answer);
    }
});

client.login(process.env.TOKEN);