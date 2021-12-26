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
  let usedPoints = 0;
  opts = {
    inline_keyboard: []
  };
  for (let up in acc.attributes.stats) {
    usedPoints += acc.attributes.stats[up];
    opts.inline_keyboard.push([
      {
        text:
          helper.parseSta(up) +
          " +" +
          _attr[up] +
          "/p (" +
          acc.attributes.stats[up] +
          ")",
        callback_data: "__attr__"
      },
      { text: "➕", callback_data: "add_attr_point " + up }
    ]);
  }
  opts.inline_keyboard.push([{ text: "↩️ Atras", callback_data: "menu" }]);

  switch (data.data) {
    case "menu_attributes":
      message =
        "➕ **Atributos**:\n\n" +
        "✨ **Puntos**: " +
        acc.attributes.points +
        "\n" +
        "💫 **Puntos Usados**: " +
        usedPoints;

      break;
    default:
      return;
  }
  global.bot.users[user].inline = 230;

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
