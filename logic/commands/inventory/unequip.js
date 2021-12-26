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
    case String(data.data.match(/^unequip.*/)):
      let itemTU = data.data.split(" ")[1];
      opts = {
        inline_keyboard: []
      };

      opts.inline_keyboard.push([{ text: "↩️ Atras", callback_data: "menu_equipment" }]);
      let _itemTU = acc.equipment[itemTU];
      if(_itemTU != 'na'){
          let __itemTU = helper.readFile(config.DB + '/items/' + _itemTU + '.json');
        global.bot.users[user].inventory.armory.push(_itemTU);
        global.bot.users[user].equipment[itemTU] = 'na';
        message = '🎒 El objeto "'+ __itemTU .name + '" se a desequipado correctamente.';
      }else{
         message = '⚠️ No posee ningun objeto equipado en esta ranura.'; 
      }
      break;
    default:
      return;
  }
  global.bot.users[user].inline = 657;

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
