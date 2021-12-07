const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class LoveCommand extends BaseCommand {
  constructor() {
    super("love", "fun", []);
  }

  run(client, message, args) {
    if (!message.mentions.members.first())
      return message.channel
        .send(`Please mention someone to calculate the love percentage`)
        .then(message.react("❌"));
    let person = message.mentions.members.first();

    const love = Math.round(Math.random() * 100);
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

    let loveEmbed = new MessageEmbed()
      .setTitle("Love percentage")
      .setDescription(
        `${message.author} loves ${person} this much: ${love}%\n\n${loveLevel}`
      );

    message.channel.send({ embeds: [loveEmbed] });
  }
};
