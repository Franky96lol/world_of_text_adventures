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
    case String(data.data.match(/^item.*/)):
      let _data = data.data.split(" ");
      if (_data.length == 3) {
        opts = {
          inline_keyboard: [
            [{ text: "↩️ Atras", callback_data: "menu_equipment" }]
          ]
        };
        if(_data[1] != 'na'){
            opts.inline_keyboard[0].push({text : 'Desequipar 🎒' , callback_data : 'unequip ' + _data[2]});
        }

        let item = helper.readFile(config.DB + "/items/" + _data[1] + ".json");

        message =
          helper.parseItemType("short", item.type) +
          " **" +
          item.name + "** " + helper.parseQuality(item.quality) + "\n" +
          "🔝 **Nivel**: " + item.level +
          "\n" +
          "🆔: `" +
          _data[1] +
          "`\n" +
          "🔰 **Clase**: " +
          helper.parseClass(item.class) +
          "\n" +
          "📜 **Descripción**: " +
          item.desc +
          "\n" +
          "\n❤️ **Vida**: " +
          item.hp +
          "\n" +
          "❣️ **Reg. Vida**: " +
          item.hp_reg + "%" +
          "\n" +
          "💠 **Mana**: " +
          item.mp +
          "\n" +
          "🔷 **Reg. Mana**: " +
          item.mp_reg +
          "\n" +
          "🗡️ **Daño**: " +
          item.dmg +
          "\n" +
          "🛡️ **Defensa**: " +
          item.def +
          "\n" +
          "💘 **Critico**: " +
          item.crit + "%" +
          "\n" +
          "🌀 **Esquiva**: " +
          item.dodge + "%" +
          "\n" +
          "🧠 **Xp. Extra**: " +
          item.xp_extra + "%" +
          "\n" +
          "💰 **Oro Extra**: " +
          item.gold_extra + "%";
      } else {
        opts = {
          inline_keyboard: [[{ text: "↩️ Atras", callback_data: "armory" }]]
        };        
        if(_data[1] != 'na'){
            opts.inline_keyboard[0].push({text : 'Equipar ⚔️' , callback_data : 'equip ' + _data[2]});
        }

        let item = helper.readFile(config.DB + "/items/" + _data[1] + ".json");
        let eitem = helper.readFile(config.DB + "/items/" + acc.equipment[item.type] + ".json");
        message =
          helper.parseItemType("short", item.type) +
          " **" +
          item.name + "** " + helper.parseQuality(item.quality) + "\n" +
          "🔝 **Nivel**: " + item.level +
          "\n" +
          "🆔: `" +
          _data[1] +
          "`\n" +
          "🔰 **Clase**: " +
          helper.parseClass(item.class) +
          "\n" +
          "📜 **Descripción**: " +
          item.desc +
          "\n" +
          "\n❤️ **Vida**: " +
          item.hp + " (" + (item.hp - eitem.hp) + ")" +
          "\n" +
          "❣️ **Reg. Vida**: " +
          item.hp_reg + "%" + " (" +
          (item.hp_reg - eitem.hp_reg) +
          ")" +
          "\n" +
          "💠 **Mana**: " +
          item.mp + " (" + 
          (item.mp - eitem.mp) + 
          ")" +
          "\n" +
          "🔷 **Reg. Mana**: " +
          item.mp_reg + " (" +
          (item.mp_reg - eitem.mp_reg) +
          ")" +
          "\n" +
          "🗡️ **Daño**: " +
          item.dmg + " (" +
          (item.dmg - eitem.dmg) + ")" +
          "\n" +
          "🛡️ **Defensa**: " +
          item.def + " (" + 
          (item.def - eitem.def) + ")" +
          "\n" +
          "💘 **Critico**: " +
          item.crit + "%" + " (" +
          (item.crit - eitem.crit) + ")" +
          "\n" +
          "🌀 **Esquiva**: " +
          item.dodge + "%" + " (" +
          (item.dodge - eitem.dodge) + ")" +
          "\n" +
          "🧠 **Xp. Extra**: " +
          item.xp_extra + "%" + " (" + 
          (item.xp_extra - eitem.xp_extra) + ")" +
          "\n" +
          "💰 **Oro Extra**: " +
          item.gold_extra + "%" + " (" +
          (item.gold_extra + eitem.gold_extra) + ")";
      }
      break;
    default:
      return;
  }
  global.bot.users[user].inline = 700;

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
