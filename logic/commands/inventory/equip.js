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
    case String(data.data.match(/^equip.*/)):
      let itemTE = data.data.split(' ')[1] ;
      opts = {
        inline_keyboard: []
      };

      opts.inline_keyboard.push([{ text: "↩️ Atras", callback_data: "armory" }]);

      if (
        acc.inventory.armory[itemTE] != "na" &&
        itemTE < acc.inventory.armory.length &&
        itemTE >= 0 &&
        acc.inventory.armory[itemTE] != undefined
      ) {
        let _itemTE = acc.inventory.armory[itemTE];
        let __itemTE = helper.readFile(
          config.DB + "/items/" + _itemTE + ".json"
        );
        if (
          (acc.class != __itemTE.class && __itemTE.class != "none") ||
          __itemTE.level > acc.level
        ) {
          message = "⚠️ No cumple los requisitos para equipar este objeto.";
        } else {
          let itemTU = acc.equipment[__itemTE.type];
          global.bot.users[user].equipment[__itemTE.type] = _itemTE;
          global.bot.users[user].inventory.armory.splice(itemTE , 1);
          if(itemTU != 'na'){
            global.bot.users[user].inventory.armory.push(itemTU);
          }
          
          message = '⚔️ Se equipo correctamente "' + __itemTE.name + '".';
        }
      } else {
        message = "⚠️ No se pudo equipar el objeto.";
      }

      break;
    default:
      return;
  }
  global.bot.users[user].inline = 692;

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
