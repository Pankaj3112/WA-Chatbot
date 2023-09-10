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
        console.log(completion);

        let completionArr = [...prompt, completion.choices[0].message];
        return completionArr;
        
    } catch (error) {
        console.log(error.response);
    }
}

module.exports = ask