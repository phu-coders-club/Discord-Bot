require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
  partials: ["MESSAGE"],
});

const Sheets = require("node-sheets").default;
const gs = new Sheets(process.env.POINTS_SHEET_ID);
gs.authorizeApiKey(process.env.GOOGLE_SHEET_KEY);

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
  }

  if (msg.content.trim().substring(0, 13) === "$check-points") {
    const checkName = msg.content.substring(14).trim();
    if (checkName.trim() == "") {
      msg.reply(
        "You must specify a first and last name after the command. \nEx: *$check-points Jack Penn*"
      );
      return;
    }
    console.log(checkName);

    gs.tables("Points!A2:C100").then((table) => {
      for (let memberData of table.rows) {
        const memberName = `${memberData["First Name"].value} ${memberData["Last Name"].value}`;
        if (memberName.toLocaleLowerCase() == checkName.toLocaleLowerCase()) {
          msg.reply(
            `${memberName} has a total of ${memberData["Total Points"].value} points!`
          );
          return;
        }
      }
      console.log("No member found of name " + checkName);
      msg.reply(
        `No member found with the name "${checkName}". Are you sure you typed it in correctly?`
      );
    });
  }
});

client.login(process.env.BOT_TOKEN);
