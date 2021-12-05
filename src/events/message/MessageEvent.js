const BaseEvent = require('../../utils/structures/BaseEvent');
const guildModel = require('../../models/guildModel')
module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('messageCreate');
    }

    async run(client, message) {
        const guild = guildModel.findOne({_id: message.guild.id}, async (err, guild) => {
            if (!guild) {
                try {
                    const g = new guildModel({_id: guild.id, prefix: "?"})
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
        })

    }
}