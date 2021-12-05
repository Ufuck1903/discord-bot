const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SetPrefixCommand extends BaseCommand {
    constructor() {
        super('prefix', 'moderation', []);
    }

    run(client, message, args) {
        message.channel.send('setPrefix command works');
    }
}