require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
  partials: ["MESSAGE"],
});

client.on("ready", () => {
  console.log("Our bot is ready to go!!!");
});

client.on("message", (msg) => {
  switch (msg.content) {
    case "ping":
      msg.channel.send("Not tagged");
      msg.reply("pong");
      break;
    case "I love coding":
      msg.react("❤️");
      break;
    case "$mod-me":
      msg.member.roles.add("moderator");
  }
});

client.login(process.env.BOT_TOKEN);
