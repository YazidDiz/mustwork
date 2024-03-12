module.exports.config = {

	name: "videosex",

	version: "1.0.0",

	 hasPermission : 0,

   usePrefix : false,

	

	credits: "Hamim",

	 Description : "NOT FOR KIDS",

	 commandCategory : "nsfw",

	 cooldowns : 10,

	dependencies: {

		"axios": ""

	}

};

const axios = require("axios");

const fs = require("fs");

module.exports.run = async function({ api, event, args, client, __GLOBAL }) {

 

  api.sendMessage("⏱️ | Sending... Please wait...", event.threadID, event.messageID); api.setMessageReaction("⏱️", event.messageID, () => { }, true);

  const response = await axios.get('https://x2-video-api.onrender.com/videosex', {

		responseType: 'arraybuffer'

	}).catch(error => {

		api.sendMessage("Error fetching video.", event.threadID, event.messageID);

		console.error(error);

		return;

	});

  

	if (response && response.status === 200) {

		const filePath = __dirname + "/cache/videosex.mp4";

		fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'), "binary"); api.setMessageReaction("✅", event.messageID, () => { }, true);

    const tid = event.threadID

		api.sendMessage({

			body: `--『 𝐇𝟒𝐌𝟏𝐌  🄱🄾🅃 』--`,

			attachment: fs.createReadStream(filePath)

		}, event.threadID, () => fs.unlinkSync(filePath), event.messageID);

	} else {

		api.sendMessage("Failed to retrieve a video.", event.threadID, event.messageID); api.setMessageReaction("🔭", event.messageID, () => { }, true);

	}

};