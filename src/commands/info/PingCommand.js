const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super("ping", "info", []);
  }

  async run(client, message, args) {
    const msg = await message.channel.send(`🏓 Pinging....`);

    msg.edit(`🏓 Pong!
        Latency is ${Math.floor(
          msg.createdTimestamp - message.createdTimestamp
        )}ms`);
  }
};
