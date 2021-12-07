const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const { getMember, formatDate } = require("../helpers/functions");
const { stripIndents } = require("common-tags");

module.exports = class UserinfoCommand extends BaseCommand {
  constructor() {
    super("userinfo", "info", []);
  }

  async run(client, message, args) {
    const member = getMember(message, args.join(" "));

    // Member variables
    const joined = formatDate(member.joinedAt);
    const roles =
      member.roles.cache
        .filter((r) => r.id !== message.guild.id)
        .map((r) => r)
        .join(", ") || "none";

    // User variables
    const created = formatDate(member.user.createdAt);

    const embed = new MessageEmbed()
      .setFooter(member.displayName, member.user.displayAvatarURL)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setColor(
        member.displayHexColor === "#000000"
          ? "#ffffff"
          : member.displayHexColor
      )

      .addField(
        "Member information:",
        stripIndents`**- Display name:** ${member.displayName}
            **- Joined at:** ${joined}
            **- Roles:** ${roles}`,
        true
      )

      .addField(
        "User information:",
        stripIndents`**- ID:** ${member.user.id}
            **- Username**: ${member.user.username}
            **- Tag**: ${member.user.tag}
            **- Created at**: ${created}`,
        true
      )

      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};
