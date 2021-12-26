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
    case "consumables":
      opts = {
        inline_keyboard: []
      };

      message = "🧪 Consumibles:\n";
      for (let item in acc.inventory.consumables) {
        opts.inline_keyboard.push([
          {
            text: acc.inventory.consumable[item].name,
            callback_data: "consumable_item " + item
          }
        ]);
      }
      if (acc.inventory.consumables.length == 0) {
        opts.inline_keyboard.push([
          { text: "Ningun Objeto", callback_data: "__none__" }
        ]);
      }
      opts.inline_keyboard.push([

        { text: "↩️ Atras", callback_data: "inventory" }
      ]);
      break;
    default:
      return;
  }
  global.bot.users[user].inline = 425;

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