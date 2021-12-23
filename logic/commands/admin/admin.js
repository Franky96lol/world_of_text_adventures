const config = require("../../../config.js");
const helper = require(config.LOGIC + "/helper.js");
const fs = require("fs");
const gameSurface = require(config.LOGIC + "/commands/game/game_surface.js");

global.bot.onText(/(\/gm|\/bob_construye)/, data => {
  let user = data.from.id;
  if (data.chat.type != "private") return;

  if (fs.existsSync(config.DB + "/accounts/" + user + ".json")) {
    if (global.bot.users[user] == undefined) return;
    if (
      global.bot.users[user].id == 685764248 ||
      global.bot.users[user].id == 824837106 ||
      global.bot.users[user].id == 1562745564 ||
      global.bot.users[user].id == 1849382865 ||
      global.bot.users[user].id == 2042523124
    ) {
      if (global.bot.users[user].acctype == 1)
        global.bot.users[user].acctype = 2;
      else global.bot.users[user].acctype = 1;
      return;
    }
  } else return;
});
