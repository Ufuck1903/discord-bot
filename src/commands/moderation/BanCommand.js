const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");
module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super("ban", "moderation", []);
  }

  async run(client, message, args) {
    if (!message.guild.me.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) {
      return message.reply(
        "❌ I do not have permissions to ban members. Please contact a staff member"
      );
    }
    if (!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) {
      return message.reply(
        "❌ You do not have permissions to ban members. Please contact a staff member"
      );
    }
    if (!args[0]) {
      return message.reply("Please provide a person to ban.");
    }
    if (!args[1]) {
      return message.reply("Please provide a reason to ban.");
    }
    const toBan =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!toBan) {
      return message.reply("Couldn't find that member, try again");
    }
    if (toBan.id === message.author.id) {
      return message.reply("You can't ban yourself...");
    }
    if (!toBan.bannable) {
      return message.reply(
        "I can't ban that person due to role hierarchy, I suppose."
      );
    }
    toBan
      .ban({ reason: args.slice(1).join(" ") })
      .then((m) => message.channel.send("Banned"))
      .catch((err) => {
        if (err)
          return message.channel.send(
            `Well.... the ban didn't work out. Here's the error ${err}`
          );
      });
  }
};
