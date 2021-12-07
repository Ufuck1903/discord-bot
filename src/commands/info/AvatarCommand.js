const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super("avatar", "info", []);
  }

  async run(client, message, args) {
    let user = message.author;
    if (args[0]) {
      const otherUser = await client.users
        .fetch(args[0].replace(/[^0-9]/g, "", false))
        .catch((e) => {});
      if (otherUser) {
        user = otherUser;
      }
    }

    if (message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) {
      const embed = new MessageEmbed();
      embed.setTitle(`Avatar for ${user.tag}`);
      embed.setColor("BLUE");
      embed.setImage(
        user.avatarURL({ format: "png", dynamic: true, size: 1024 }) ||
          user.defaultAvatarURL
      );
      message.channel.send({ embeds: [embed] }).catch((err) => {
        console.log(err);
      });
    } else if (
      message.channel.permissionsFor(message.guild.me).has("ATTACH_FILES")
    ) {
      console.log(user.avatarURL({ format: "png", dynamic: true, size: 1024 }));
      message.channel
        .send(`Avatar for ${user.tag}`, {
          files: [user.displayAvatarURL.split("?")[0]],
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      message.channel
        .send(
          `Avatar for ${user.tag}:\n${
            user.avatarURL({ format: "png", dynamic: true, size: 1024 }) ||
            user.defaultAvatarURL
          }`
        )
        .catch((err) => console.log(err));
    }
  }
};
