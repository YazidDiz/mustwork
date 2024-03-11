const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermission: 0,
    credits: "api by jerome",//api by jonell
    description: "Gpt architecture",
    usePrefix: false,
    commandCategory: "ai",
    cooldowns: 5,
};

const mathsans = {

				a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂",

				j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋",

				s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",

				A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨",

				J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬", N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱",

				S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹",

				" ": " "

		};


module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage('Please provide a prompt to generate a text response.\nExample: ai What is the meaning of life?', event.threadID, messageID);
        }

        // Send a message indicating the AI is searching for an answer
        api.sendMessage('☁️ | 𝖤𝗇 𝗍𝗋𝖺𝗂𝗇 𝖽𝖾 𝗋é𝗉𝗈𝗇𝖽𝗋𝖾...', event.threadID);

        // Simulate waiting for an answer
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const gpt4_api = `https://jonellccapisproject-e1a0d0d91186.herokuapp.com/api/chatgpt?input=${encodeURIComponent(prompt)}`;

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.result) {
            const generatedText = response.data.result;
const generatedTextsans = generatedText.split("").map(c => mathsans[c] || c).join("");
            // Send the final message with the generated text
            api.sendMessage(`☁️ |  ✘  𝙼𝚘𝚜𝚑𝚒 𝙰𝚒 (Gpt4) 𝗔𝗶\n━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${prompt}\n━━━━━━━━━━━━━━━━\n𝗥𝗲𝗽𝗼𝗻𝘀𝗲: ${generatedTextsans}\n\n\n━━━━━━━━━━━━━━━━\n ✘ 𝙲𝚛𝚎𝚍𝚒𝚝𝚜 : 𝗭𝗲𝘁𝘀𝘂 `, event.threadID, messageID);
        } else {
            console.error('API response did not contain expected data:', response.data);
            api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};