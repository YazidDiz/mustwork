let axios = require('axios');
let fs = require('fs');

module.exports = {
  config: {
    name: 'sdxl',
    version: '1.0',
    credits: 'Zetsu',
    cooldowns: 0,
    hasPermission: 2,
    description: 'Generate anime images using zyx API', 
    usages: 'sdxl [prompt] | [model]',
    usePrefix: false,
    commandCategory: 'Zetsu-Vip',
  },

  run: async function({ api, event, args }) {
    function r(msg) {
      api.sendMessage(msg, event.threadID, event.messageID);
    }

    try {
      if (args.length < 2) {
        return r("❎ | Model : 1-5 \n1 | DreamshaperXL10 + \n2 | DynavisionXL + \n3 | JuggernautXL + \n4 | RealismEngineSDXL + \n5 | Sdxl 1.0\n Usage: sdxl [prompt] | [model]");
      }

      const [prompt, model = '4'] = args.join(' ').split('|').map(item => item.trim());
      if (!prompt || !model) {
        return r("❎ | Please provide both a prompt and a model");
      }

      const apiUrl = `https://turtle-apis.onrender.com/api/sdxl?prompt=${prompt}&model=${model}`;

      const startTime = new Date(); // Start time of image generation

      r('Veuillez patientez (50s)...⏳');

      const form = {};
      form.attachment = [];

      // Generate four images
      for (let i = 0; i < 4; i++) {
        const response = await axios.get(apiUrl, {
          responseType: 'stream'
        });
        form.attachment.push(response.data);
      }

      const endTime = new Date(); // End time of image generation
      const duration = (endTime - startTime) / 1000; // Duration in seconds

      // Create attachment message with duration
      const attachmentMessage = `Here are the generated images 🎨 (Took ${duration} seconds)`;

      // Send the four images with the attachment message
      api.sendMessage({
        body: attachmentMessage,
        attachment: form.attachment
      }, event.threadID);

    } catch (error) {
      console.error(error);
      r('❎ | Sorry, there was an issue with the API');
    }
  }
};
