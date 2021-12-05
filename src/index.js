
const { Client, Intents } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config1 = require('../slappey.json');
const { config } = require("dotenv");
config({
  path: __dirname + "/.env"
});
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config1.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  let x = `${process.env.TOKEN}`
  console.log(typeof x, x)
  await client.login(`${process.env.TOKEN}`);
})();

