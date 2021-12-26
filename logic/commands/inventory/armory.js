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
    case "armory":
      opts = {
        inline_keyboard: []
      };
     
      message = "⚔️ Armeria :\n";
      for (let item in acc.inventory.armory) {
        let _item = helper.readFile(config.DB + '/items/' + acc.inventory.armory[item] + '.json');
        opts.inline_keyboard.push([
          {
            text: helper.parseItemType('short' , _item.type) + " " +_item.name,
            callback_data: "item " + acc.inventory.armory[item] + " " + item + " e"
          }
        ]);
      }
      if (acc.inventory.armory.length == 0) {
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
  global.bot.users[user].inline = 405;

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
