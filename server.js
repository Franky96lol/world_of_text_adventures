const TelegramBot = require("node-telegram-bot-api");
const config = require("./config");
const helper = require(config.LOGIC + "/helper.js");
const bot = new TelegramBot(config.TOKEN, { polling: true });
const fs = require("fs");

const WorldEngine = require(config.LOGIC + "/engine/map_generator.js");
//creating the globals var

global.bot = bot;
bot.createAcc = {};
bot.users = {};

global.World = helper.readFile(config.DB + "/world_map.json");

require(config.LOGIC + "/commands/router.js");

bot.on("polling_error", err => console.log(err));

const express = require("express");

const app = express();

app.use(function(req, res) {
  res.send({ mess: "o hai!" }).status(200);
});
const server = app.listen(config.PORT);

const request = require("requestify");

setInterval(() => request.get("https://fireshoot-bot.glitch.me"), 120000);

console.log("Bot started...");
