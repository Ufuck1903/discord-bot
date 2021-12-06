const BaseCommand = require("../../utils/structures/BaseCommand");
const guildModel = require("../../models/guildModel");
module.exports = class SetPrefixCommand extends BaseCommand {
  constructor() {
    super("prefix", "moderation", []);
  }

  async run(client, message, args) {
    if (!args[0]) {
      return message.reply("Please provide an arg.");
    }

    if (!message.member.permissions.has("MANAGE_GUILD")) {
      //check user permission
      return message.channel.send(
        "You don't have the permissions to use this command! (MANAGE_GUILD)"
      );
    }
    if (args[0].length > 5) return message.channel.send("Max 5 characters!"); //check arg max 5 characters
    const check = /^[!-\/:-@\[-`{-~a-zA-Z0-9]{1,4}$/.test(args[0]); //only allowed !-/\:-@ azAZ09
    if (check === false)
      return message.channel.send(
        "Can only contain symbol numbers and letters."
      );
    const filter = { _id: message.guild.id };
    const update = { prefix: args[0] };
    let doc = await guildModel.findOneAndUpdate(filter, update, {
      useFindAndModify: false,
    }); // update user arg on database
    message.channel.send(`Now prefix is "${args[0]}"`);
  }
};
