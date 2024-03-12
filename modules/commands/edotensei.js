module.exports.config = {
  name: "edotensei",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Marjhun Baylon",
  description: "Restart Bot",
  usePrefix: false,
  commandCategory: "system",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  return api.sendMessage(`🔁 | 𝘙𝘦𝘪𝘯𝘤𝘢𝘳𝘯𝘢𝘵𝘪𝘰𝘯 𝘦𝘯 𝘤𝘰𝘶𝘳𝘴....`, threadID, () => process.exit(1));
}