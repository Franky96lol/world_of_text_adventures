const TelegramBot = require("node-telegram-bot-api");
const config = require("./config");
const helper = require(config.LOGIC + "/helper.js");
var bot = new TelegramBot(config.TOKEN, { polling: true });
const WorldEngine = require(config.LOGIC + '/engine/map_generator.js');
global.bot = bot;
bot.createAcc = {};
bot.users = {};

global.World = helper.readFile(config.DB + "/world_map.json");



require(config.LOGIC + "/commands/router.js");

bot.on("polling_error", err => console.log(err));
