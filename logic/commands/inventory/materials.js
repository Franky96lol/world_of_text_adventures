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
    case "materials":
      opts = {
        inline_keyboard: []
      };

      message = "⚒️ Materiales:\n";
      for (let item in acc.inventory.materials) {
        opts.inline_keyboard.push([
          {
            text: acc.inventory.materials[item].name + " \t x" +
        acc.inventory.materials[item].quantity,
            callback_data: "material_item " + item
          }
        ]);
      }
 
      if (acc.inventory.materials.length == 0) {
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
  global.bot.users[user].inline = 445;

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