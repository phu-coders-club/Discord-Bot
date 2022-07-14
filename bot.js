require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
  partials: ["MESSAGE"],
});

const Sheets = require("node-sheets").default;
const gs = new Sheets(process.env.POINTS_SHEET_ID);
gs.authorizeApiKey(process.env.GOOGLE_SHEET_KEY);

const BOT_PREFIX = "$";

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
    case `${BOT_PREFIX}check-points`:
      //   msg.member.roles.add("moderator");
      gs.tables("Points!A2:C11").then((table) => {
        // console.log(table.headers);
        // console.log(table.formats);
        const requesterName = "John Doe";
        for (let memberData of table.rows) {
          const memberName = `${memberData["First Name"].value} ${memberData["Last Name"].value}`;
          if (memberName === requesterName) {
            msg.reply(
              `You have a total of ${memberData["Total Points"].value} points!`
            );
            return;
          }
        }
        throw "No member found of name " + requesterName;
      });
  }
});

client.login(process.env.BOT_TOKEN);
