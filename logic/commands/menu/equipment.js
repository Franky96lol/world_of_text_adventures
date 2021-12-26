const config = require("../../../config.js");
const gameSurface = require(config.LOGIC + "/commands/game/game_surface.js");
const helper = require(config.LOGIC + "/helper.js");

global.bot.on("callback_query", data => {
  let user = data.from.id;
  if (global.bot.users[user] == undefined) return;
  let opts;

  let message = "";
  let oldInline = global.bot.users[user].inline;
  let pos = global.bot.users[user].pos;
  let acc = global.bot.users[user];

  switch (data.data) {
    case "menu_equipment":
      opts = {
        inline_keyboard: []
      };

      message = "🛡️ **Equipamiento**:\n";
      for (let item in acc.equipment) {
        let _item = helper.readFile(
          config.DB + "/items/" + acc.equipment[item] + ".json"
        );
        opts.inline_keyboard.push([
          {
            text: helper.parseItemType("short", item),
            callback_data: "__none__"
          },
          {
            text: _item.name,
            callback_data: "item " + acc.equipment[item] + " " + item
          }
        ]);
      }

      opts.inline_keyboard.push([{ text: "↩️ Atras", callback_data: "menu" }]);
      break;
    default:
      return;
  }
  global.bot.users[user].inline = 572;

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
