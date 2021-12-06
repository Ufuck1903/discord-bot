const BaseEvent = require("../../utils/structures/BaseEvent");
const guildModel = require("../../models/guildModel");
module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super("ready");
  }

  async run(client) {
    console.log(client.user.tag + " has logged in.");
    /*Add all client guilds to database*/
    /*await addAllGuild(client)*/ //only first run
  }
};

const addAllGuild = (client) => {
  client.guilds.cache.forEach(async (guild) => {
    let g = await guildModel.findOne({ _id: guild.id });
    if (!g) {
      try {
        g = new guildModel({ _id: guild.id, prefix: "?" });
        await g.save();
      } catch (e) {
        if (e.code !== 11000) {
          throw e;
        }
      }
    }
  });
};
