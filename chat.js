const {OpenAI} = require("openai");
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});


async function ask(prompt) {
    try {
        const completion= await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: prompt,
        });
        console.log(completion);

        let completionArr = [...prompt, completion.choices[0].message];
        return completionArr;
        
    } catch (error) {
        console.log(error.response);
    }
}

module.exports = ask