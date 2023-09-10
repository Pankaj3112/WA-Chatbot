const ask = require('./chat')
const qrcode = require('qrcode-terminal');
const { Client,LocalAuth} = require('whatsapp-web.js');
require('dotenv').config();


const client = new Client({
    puppeteer: {
		args: ['--no-sandbox'],
	},
    authStrategy: new LocalAuth({
        clientId: "client-one"
      }),
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Connection Established!'); 
})


let storage = {};

client.on('message', async message => {
    try {

        if (message.body.startsWith("!")) {
            let prompt = message.body.substring(1);
            let from = message.from;

            if(!storage[from]) {
                storage[from] = [];
            }

            if(prompt === "clear") {
                storage[from] = [];
                message.reply("Conversation cleared!")
                return;
            }
            else{

                let userMsg = {role: "user", content: prompt};
                storage[from].push(userMsg);

                let completion = await ask(storage[from]);
                message.reply(completion[completion.length - 1].content);

                storage[from] = completion;
            }

            console.log(storage[from]);
        } 

    } catch (error) {
        console.log(error);
    }
})

client.initialize();

console.log("Bot is running...")