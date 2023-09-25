import OpenAI from "openai";
import { process } from './process'

const UIcard = document.getElementById('card');
const UItitle = document.getElementById('card-title');
const UIbody = document.getElementById('card-body');
const UIfooter = document.getElementById('card-footer');
const loader = document.getElementById('loader');
const UIform = document.getElementById('user-form');
const UIinput = document.getElementById('user-idea');
const wordSelect = document.getElementById('word-select');

UIform.addEventListener('submit', generateEssay);



function generateEssay(e) {
    let idea = UIinput.value;
    let wordCount = wordSelect.value;

    loader.classList.remove('d-none')
    getEssay({ idea, wordCount })

    // UIinput.value = '';
    // wordCount.value = 'Words';

    e.preventDefault()
}

async function getEssay(obj) {
    const openai = new OpenAI({
        apiKey: process.env.API_KEY,
        dangerouslyAllowBrowser: true
    })

    const req = await openai.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Write out a great essay of ${obj.wordCount} words on the idea "${obj.idea}". Give the essay a title too. Return this as a JSON OBJECT in the ffg format {"title": ..., "essay": ..., "words":..}`
            }
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 700
    })


    const res = req.choices[0].message.content;

    const data = JSON.parse(res)
    console.log(data);
    populateData(data);
}

function populateData(data) {
    loader.classList.add('d-none');

    UItitle.innerText = data.title;
    UIbody.innerText = data.essay;
    UIfooter.innerText = `Words: ${data.words}`;

    UIcard.classList.remove('d-none');

}
// const openai = new OpenAI({
//     apiKey: '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',
//     dangerouslyAllowBrowser: true
// });

// const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: "What version of chatGPT is this" }],
//     model: "gpt-3.5-turbo",
//     max_tokens: 500
// });

// const response = chatCompletion.choices[0].message.content;


// 3.3.0
// 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