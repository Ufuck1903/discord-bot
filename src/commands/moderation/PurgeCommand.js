const BaseCommand = require("../../utils/structures/BaseCommand");
const { Permissions } = require("discord.js");

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super("purge", "moderation", []);
  }

  run(client, message, args) {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      return message.reply("You can't delete messages....");
    }
    if (!args[0]) return message.channel.send("Please provide args");
    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
      return message.reply(
        "Yeah.... That's not a number? I also can't delete 0 messages by the way."
      );
    }
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      return message.reply("Sorry... I can't delete messages.");
    }
    let toDelete = parseInt(args[0]);
    message.channel
      .bulkDelete(toDelete)
      .then((deleted) =>
        message.channel.send(`I deleted \`${deleted.size}\` messages.`)
      )
      .catch((err) => message.reply(`Something went wrong... ${err}`));
  }
};
