const config = require("../../../config.js");
const gameSurface = require(config.LOGIC + "/commands/game/game_surface.js");
const helper = require(config.LOGIC + "/helper.js");
const WorldEngine = new (require(config.LOGIC + "/engine/map_generator.js"))();
const _stats = require(config.LOGIC + "/engine/stats_engine.js");
const _attr = require(config.DB + "/attributes.json");

global.bot.on("callback_query", data => {
  let user = data.from.id;
  if (global.bot.users[user] == undefined) return;
  let opts;

  let message = "";
  let oldInline = global.bot.users[user].inline;
  let pos = global.bot.users[user].pos;
  let acc = global.bot.users[user];

  opts = {
    inline_keyboard: []
  };

  switch (data.data) {
    case "menu_skills":
      message = "**📖 Habilidades**:";
      for (let skill in acc.skills) {
        opts.inline_keyboard.push([
          {
            text:
              helper.parseAttackType(
                global.skills[acc.skills[skill].name].type
              ) +
              " " +
              global.skills[acc.skills[skill].name].name,
            callback_data: "skill " + skill
          }
        ]);
        if (acc.skills[skill].name == acc.class) {
          opts.inline_keyboard[skill].push({
            text: "🤚🏻",
            callback_data: "shortcut skill " + skill
          });
        }
      }
      if (acc.skills.length == 0) {
        opts.inline_keyboard.push([
          { text: "Ninguna Habilidad", callback_data: "__none__" }
        ]);
      }
      opts.inline_keyboard.push([{ text: "↩️ Atras", callback_data: "menu" }]);
      global.bot.users[user].inline = 38;
      break;
    case String(data.data.match(/^skill.*/)):
      let _skill = parseInt(data.data.split(" ")[1]);
      if (_skill == undefined) return;

      let skill = global.skills[acc.skills[_skill].name];
      let dmg = "" , heal = "";
      if(skill.dmg != 0){
        dmg += "🗡️ **Daño**: (" + 
          skill.dmg + "% DCA) + " + skill.dmg_base + "";
      }
      message =
        helper.parseAttackType(skill.type) +
        " " +
        skill.name +
        "\n\n📖 " +
        skill.desc +
        "\n\n" +
        "🏹 **Objetivo**: " +
        helper.parseTarget(skill.target) + "\n" +
        dmg;
      global.bot.users[user].inline = 39;
      break;
    default:
      return;
  }

  if (
    global.bot.users[user].message != message ||
    oldInline != global.bot.users[user].inline
  ) {
    global.bot.users[user].message = message;
    global.bot.editMessageText(global.bot.users[user].message, {
      chat_id: data.message.chat.id,
      message_id: data.message.message_id,
      reply_markup: opts,
      parse_mode: "Markdown"
    });
  }
});
