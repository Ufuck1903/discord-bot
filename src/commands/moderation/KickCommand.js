const BaseCommand = require('../../utils/structures/BaseCommand');
const {Permissions} = require('discord.js');
module.exports = class KickCommand extends BaseCommand {
    constructor() {
        super('kick', 'moderation', []);
    }

    async run(client, message, args) {
        if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return message.reply("❌ I do not have permissions to kick members. Please contact a staff member")

        }

        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return message.reply("❌ You do not have permissions to kick members. Please contact a staff member")

        }


        if (!args[0]) {
            return message.reply("Please provide a person to kick.")

        }


        if (!args[1]) {
            return message.reply("Please provide a reason to kick.")

        }


        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);


        if (!toKick) {
            return message.reply("Couldn't find that member, try again")
        }


        if (toKick.id === message.author.id) {
            return message.reply("You can't kick yourself...")

        }


        if (!toKick.kickable) {
            return message.reply("I can't kick that person due to role hierarchy, I suppose.")

        }
        toKick.kick(args.slice(1).join(" ")).then(m => message.channel.send("Kicked"))
            .catch(err => {
                if (err) return message.channel.send(`Well.... the kick didn't work out. Here's the error ${err}`)
            });

    }
}