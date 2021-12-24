const config = require("../../../config.js");
const gameSurface = require(config.LOGIC + "/commands/game/game_surface.js");
const helper = require(config.LOGIC + "/helper.js");
const WorldEngine = new (require(config.LOGIC + "/engine/map_generator.js"))();

global.bot.on("callback_query", data => {
  //console.log('mmm');
  let user = data.from.id;
  if (global.bot.users[user] == undefined) return;
  let opts;
  let _selector = {
    action: "👋🏻",
    attack: "🗡️",
    construction: "⚒️"
  };
  let selector = _selector[global.bot.users[user].selector];

  let oldInline = global.bot.users[user].inline;
  let pos = global.bot.users[user].pos;
  switch (data.data) {
    case "m_center":
      break;
    case "m_up":
      if (
        global.World[pos._floor][pos.x - 1][pos.y].m != 0 &&
        global.bot.users[user].acctype != 2
      )
        break;
      global.bot.users[user].pos.x--;
      break;
    case "m_left":
      if (
        global.World[pos._floor][pos.x][pos.y - 1].m != 0 &&
        global.bot.users[user].acctype != 2
      )
        break;
      global.bot.users[user].pos.y--;
      break;
    case "m_right":
      if (
        global.World[pos._floor][pos.x][pos.y + 1].m != 0 &&
        global.bot.users[user].acctype != 2
      )
        break;
      global.bot.users[user].pos.y++;
      break;
    case "m_down":
      if (
        global.World[pos._floor][pos.x + 1][pos.y].m != 0 &&
        global.bot.users[user].acctype != 2
      )
        break;
      global.bot.users[user].pos.x++;
      break;
    case "a_center":
      if (global.bot.users[user].acctype == 2) {
        if (global.bot.users[user].selector == "action") {
          global.bot.users[user].selector = "construction";
        } else global.bot.users[user].selector = "action";
      } else {
        if (global.bot.users[user].selector == "attack") {
          global.bot.users[user].selector = "action";
        } else global.bot.users[user].selector = "attack";
        console.log(global.bot.users[user].selector);
      }

      if (global.bot.users[user].inline != 4)
        global.bot.users[user].inline = 4;
      else global.bot.users[user].inline = 6;

      selector = _selector[global.bot.users[user].selector];

      break;
    case "a_up":
      switch (global.bot.users[user].selector) {
        case "construction":
          WorldEngine.edit(
            { _floor: pos["_floor"], x: pos.x - 1, y: pos.y },
            global.World,
            global.bot.users[user].admin.texture,
            global.bot.users[user].admin.material,
            global.bot.users[user].admin.trigger
          );
          break;
      }
      break;
    case "a_left":
      switch (global.bot.users[user].selector) {
        case "construction":
          WorldEngine.edit(
            { _floor: pos["_floor"], x: pos.x, y: pos.y - 1 },
            global.World,
            global.bot.users[user].admin.texture,
            global.bot.users[user].admin.material,
            global.bot.users[user].admin.trigger
          );
          break;
      }
      break;
    case "a_right":
      switch (global.bot.users[user].selector) {
        case "construction":
          WorldEngine.edit(
            { _floor: pos["_floor"], x: pos.x, y: pos.y + 1 },
            global.World,
            global.bot.users[user].admin.texture,
            global.bot.users[user].admin.material,
            global.bot.users[user].admin.trigger
          );
          break;
      }
      break;
    case "a_down":
      switch (global.bot.users[user].selector) {
        case "construction":
          WorldEngine.edit(
            { _floor: pos["_floor"], x: pos.x + 1, y: pos.y },
            global.World,
            global.bot.users[user].admin.texture,
            global.bot.users[user].admin.material,
            global.bot.users[user].admin.trigger
          );
          break;
      }
      break;
    case "admin_textures":
      global.bot.users[user].admin.menu = "textures";
      global.bot.users[user].inline = 2;
      break;
    case "admin_menu":
      global.bot.users[user].admin.menu = "main";
      global.bot.users[user].inline = 1;
      break;
    case String(data.data.match(/^texture.*/)):
      let _atexture = data.data.split(" ")[1];
      global.bot.users[user].admin.texture = _atexture;
      break;
    case String(data.data.match(/^admin_m.*/)):
      let mat = data.data.split(" ")[1];
      global.bot.users[user].admin.material = mat;
      break;
    case "menu_back":
      break;
    default:
      return;
  }

  if (global.bot.users[user].acctype < 2) {
    opts = {
      inline_keyboard: [
        [
          { text: "📖 Menu", callback_data: "menu" },
          { text: "Inventario 🎒", callback_data: "inventory" }
        ],
        [
          { text: "⬆️", callback_data: "m_up" },
          { text: "🔼", callback_data: "a_up" }
        ],
        [
          { text: "⬅️", callback_data: "m_left" },
          { text: "🔄", callback_data: "m_center" },
          { text: "➡️", callback_data: "m_right" },
          { text: "◀️", callback_data: "a_left" },
          { text: selector, callback_data: "a_center" },
          { text: "▶️", callback_data: "a_right" }
        ],
        [
          { text: "⬇️", callback_data: "m_down" },
          { text: "🔽", callback_data: "a_down" }
        ],
        [
          { text: "1️⃣", callback_data: "a_1" },
          { text: "2️⃣", callback_data: "a_2" },
          { text: "3️⃣", callback_data: "a_3" },
          { text: "4️⃣", callback_data: "a_4" },
          { text: "5️⃣", callback_data: "a_5" },
          { text: "6️⃣", callback_data: "a_6" }
        ]
      ]
    };
  } else {
    let textures = helper.readFile(config.DB + "/textures.json");
    if (global.bot.users[user].admin.menu == "main") {
      opts = {
        inline_keyboard: [
          [
            { text: "⬆️", callback_data: "m_up" },
            { text: "🔼", callback_data: "a_up" }
          ],
          [
            { text: "⬅️", callback_data: "m_left" },
            { text: "🔄", callback_data: "m_center" },
            { text: "➡️", callback_data: "m_right" },
            { text: "◀️", callback_data: "a_left" },
            { text: selector, callback_data: "a_center" },
            { text: "▶️", callback_data: "a_right" }
          ],
          [
            { text: "⬇️", callback_data: "m_down" },
            { text: "🔽", callback_data: "a_down" }
          ],
          [
            { text: "Densidad:", callback_data: "__dens__" },
            { text: "tras", callback_data: "admin_m 0" },
            { text: "dest", callback_data: "admin_m 1" },
            { text: "no-tras", callback_data: "admin_m 2" }
          ],
          [
            { text: "Texturas", callback_data: "admin_textures" },
            { text: "Triggers", callback_data: "admin_trigger" }
          ]
        ]
      };

      //console.log(bot.users[user].admin.menu);
    } else if (global.bot.users[user].admin.menu == "textures") {
      opts = {
        inline_keyboard: [[{ text: "↩️ Atras", callback_data: "admin_menu" }]]
      };
      let array = [];
      let counter = 0;
      for (let texture in textures) {
        array.push({
          text: textures[texture],
          callback_data: "texture " + texture
        });
        if (array.length == 6) {
          opts.inline_keyboard.push(array);
          array = [];
        }
        if (counter == Object.keys(textures).length - 1) {
          opts.inline_keyboard.push(array);
        }
        counter++;
      }
    }

    //console.log('2' + bot.users[user].admin.menu);
  }

  if (
    global.bot.users[user].message != gameSurface(user) ||
    oldInline != global.bot.users[user].inline
  ) {
    global.bot.users[user].message = gameSurface(user);
    global.bot.editMessageText(global.bot.users[user].message, {
      chat_id: data.message.chat.id,
      message_id: data.message.message_id,
      reply_markup: opts
    });
  }
});
