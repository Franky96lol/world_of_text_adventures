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
    case "inventory":
      message =
        "🎒 **Inventario**: \n\n" +
        "💰 **Oro**: " +
        acc.gold +
        " \t " +
        "🀄 **Honor**: " +
        acc.honor +
        "\n\n🎗️ **Emblemas**:\n" +
        "🧧 **Justicia**: " +
        acc.emblems.justice +
        " \t 💀 **Heroismo**: " +
        acc.emblems.heroism;
      
      opts = {
        inline_keyboard: [
          [{ text: "⚔️ Armeria 🛡️", callback_data: "armory" }],
          [{ text: "🧪 Consumibles 🍎", callback_data: "consumables" }],
          [{ text: "🧱 Materiales ⚒️", callback_data: "materials" }],
          [{ text: "↩️ Atras", callback_data: "menu_back" }]
        ]
      };

      break;
    default:
      return;
  }
  global.bot.users[user].inline = 400;

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
