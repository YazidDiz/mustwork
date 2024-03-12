const axios = require("axios");

module .exports .config = {
  name: "rankup",
  version: "1.0.0",
  cooldown: 5,
 };

module .exports .handleEvent = async function({
  api,
  event,
  Experience,
  Currencies
}) {
  try {
    if (rankup[event?.threadID] === false) {
      return;
    }

    if (event?.body && event.senderID == api.getCurrentUserID()) {
      return;
    }

    const { levelInfo, levelUp } = Experience;

    const rank = await levelInfo(event?.senderID);

    if (!rank || typeof rank !== "object") {
      return;
    }

    const { name, exp, level } = rank;

    const requiredExp = 10 * Math.pow(2, level);

    if (exp >= requiredExp) {
      await levelUp(event?.senderID);

      const rewardAmount = 1000 * level;

      await Currencies.increaseMoney(event.senderID, rewardAmount);

      api.sendMessage(
        `𝑪𝒐𝒏𝒈𝒓𝒂𝒕𝒖𝒍𝒂𝒕𝒊𝒐𝒏𝒔 ${name}! 𝑉𝑜𝑢𝑠 𝑎𝑣𝑒𝑧 𝑎𝑡𝑡𝑒𝑖𝑛𝑡 𝑙𝑒 𝑙𝑒𝑣𝑒𝑙 ${level +
          1} 𝑒𝑡 𝑜𝑏𝑡𝑒𝑛𝑢 ${rewardAmount} $ 𝑒𝑛 𝑟𝑒𝑐𝑜𝑚𝑝𝑒𝑛𝑠𝑒 !\n (Utilisez 𝑴𝒐𝒏𝒆𝒚 pour consulter votre solde.)`,
        event.threadID
      );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.run = async function({
  api,
  event,
  Experience,
  Currencies,
  args
}) {
  try {
    if (event?.body && event.senderID == api.getCurrentUserID()) {
      return;
    }

    const input = args.join(" ");

    if (!input) {
      api.sendMessage(
        "Invalid command usage. Rankup [on/off] or [info]",
        event.threadID,
        event.messageID
      );
      return;
    }

    const { levelInfo } = Experience;
    const rank = await levelInfo(event?.senderID);

    if (!rank || typeof rank !== "object") {
      return;
    }

    const { name, exp, level } = rank;

    switch (input) {
      case "on":
        rankup[event.threadID] = true;
        api.sendMessage(
          "Rankup notification is now enabled for this chat.",
          event.threadID,
          event.messageID
        );
        break;
      case "off":
        rankup[event.threadID] = false;
        api.sendMessage(
          "Rankup notification is now disabled for this chat.",
          event.threadID,
          event.messageID
        );
        break;
      case "info":
        api.sendMessage(
          `Hi ${name}, your current level is ${level} with ${exp} experience points. To advance to the next level, you need ${10 *
            Math.pow(2, level) -
            exp} more experience points.`,
          event.threadID,
          event.messageID
        );
        break;
      case "status":
        api.sendMessage(
          `Rankup notification is currently ${
            rankup[event.threadID] ? "enabled" : "disabled"
          } for this chat.`,
          event.threadID,
          event.messageID
        );
        break;
      default:
        api.sendMessage(
          "Invalid command usage. Rankup [on/off] or [info]",
          event.threadID,
          event.messageID
        );
    }
  } catch (error) {
    console.log(error);
  }
};