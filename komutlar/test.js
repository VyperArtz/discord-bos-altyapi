const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {
message.channel.send('Bu bir **TEST** mesajıdır. [Waron Stüdyo TR] - Boş Bot Altyapı')
};

exports.config = {
  name: "test",
  guildOnly: true,
  aliases: [],
};