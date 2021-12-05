const {Client, Intents} = require('discord.js');
const {registerCommands, registerEvents} = require('./utils/registry');
const {config} = require("dotenv");
const mongoose = require("mongoose");
config({
    path: __dirname + "/.env"
});
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

(async () => {
    mongoose.connect(process.env.DATABASE, () => {
        console.log("Connected to database")
    });
    client.commands = new Map();
    client.events = new Map();
    client.prefix = process.env.PREFIX
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    await client.login(`${process.env.TOKEN}`);
})();

