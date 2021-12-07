const BaseCommand = require("../../utils/structures/BaseCommand");
const { Permissions, MessageEmbed } = require("discord.js");
const got = require("got");
module.exports = class MemeCommand extends BaseCommand {
  constructor() {
    super("meme", "fun", []);
  }

  run(client, message, args) {
    if (
      !message.guild.me.permissions.has(
        Permissions.FLAGS.EMBED_LINKS || Permissions.FLAGS.ATTACH_FILES
      )
    )
      return message.channel.send(
        "Uh.I cant but i dont have EMBED_LINKS,ATTACH_FILES permission.If you are want to fix that use botinfo command and invite me again."
      );
    const embed = new MessageEmbed();
    got("https://www.reddit.com/r/dankmemes/random/.json")
      .then((response) => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
        embed.setImage(memeImage);
        embed.setFooter(
          `👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`
        );
        message.channel.send({ embeds: [embed] });
      })
      .catch(console.error);
  }
};
