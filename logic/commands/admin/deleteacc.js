const config = require("../../../config.js");
const helper = require(config.LOGIC + "/helper.js");
const fs = require("fs");
const gameSurface = require(config.LOGIC + "/commands/game/game_surface.js");

global.bot.onText(/^\/delete.*/, data => {
  let user = data.from.id;
  if (data.chat.type != "private") return;
  if (fs.existsSync(config.DB + "/accounts/" + user + ".json")) {
    if (global.bot.users[user] == undefined) return;
    if (global.bot.users[user].acctype == 2) {
      if (data.text.split(" ").length != 2) return;
      
      switch (data.text.split(" ")[1]) {
        case "acc":
          let accs = fs.readdirSync(config.DB + "/accounts/");
          for (let acc of accs) {
            fs.unlinkSync(config.DB + "/accounts/" + acc);
          }
          
          global.bot.sendMessage(user, "Base de datos de usuarios borrada!");
          break;
      }
    } else return;
  } else return;
});
