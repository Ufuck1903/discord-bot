const BaseEvent = require("../../utils/structures/BaseEvent");
const guildModel = require("../../models/guildModel");
const cleverbot = require("../../helpers/cleverbot");
module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("messageCreate");
  }
  async run(client, message) {
    /*Clever bot function*/
    if (
      message.content.toLowerCase().startsWith(`<@!${client.user.id}>`) ||
      message.content.toLowerCase().startsWith(`<@${client.user.id}>`)
    ) {
      if (message.content === `<@${client.user.id}>`)
        return message
          .reply("Wrong usage ?help chatbot for more info")
          .catch(console.error); //if only mention
      if (message.content === `<@!${client.user.id}>`)
        return message
          .reply("Wrong usage ?help chatbot for more info")
          .catch(console.error); //if only mention
      const args1 = message.content.replace(`<@553677383895351296> `, "");
      const args3 = args1.replace(`<@!553677383895351296> `, "");
      cleverbot(args3).then((response) => {
        message.reply(response);
      });
    }
    /* Custom prefix conf*/
    const guild = guildModel.findOne(
      { _id: message.guild.id },
      async (err, guild) => {
        if (!guild) {
          try {
            const g = new guildModel({ _id: guild.id, prefix: "?" });
            await g.save();
          } catch (e) {
            if (e.code !== 11000) {
              throw e;
            }
          }
        }
        let prefix = guild.prefix;
        if (message.author.bot) return;
        if (message.content.startsWith(prefix)) {
          const [cmdName, ...cmdArgs] = message.content
            .slice(prefix.length)
            .trim()
            .split(/\s+/);
          const command = client.commands.get(cmdName);
          if (command) {
            command.run(client, message, cmdArgs);
          }
        }
      }
    );
  }
};
