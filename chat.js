const {OpenAI} = require("openai");

const openai = new OpenAI({
    apiKey: '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',
});


async function ask(prompt) {
    try {
        const completion= await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: prompt,
        });
        
        let completionArr = [...prompt, completion.choices[0].message];
        return completionArr;
        
    } catch (error) {
        console.log(error.response);
    }
}

module.exports = ask