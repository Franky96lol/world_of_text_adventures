const config = require("../../../config.js");
const helper = require(config.LOGIC + "/helper.js");
const fs = require("fs");
const gameSurface = require(config.LOGIC + "/commands/game/game_surface.js");

global.bot.onText(/(\/start|\/login)/, data => {
  let user = data.from.id;
  if (data.chat.type != "private") return;

  if (!fs.existsSync(config.DB + "/accounts/" + user + ".json")) {
    let playername =
      "player" +
      fs.readdirSync(config.DB + "/accounts").length +
      "" +
      (Math.round(Math.random() * 89) + 10);
    let acc = {
      id: user,
      heroname: playername,
      pos: {
        x: 4,
        y: 2,
        _floor: 1
      },
      faction: "?",
      class: "?",
      level: 1,
      xp: 0,
      guild: "",
      acctype: 1,
      gold: 0,
      honor: 0,
      emblems: {
        justice: 0,
        heroism: 0
      },
      stats: {
        hp: 0,
        mp: 0,
        auras: []
      },
      teleport_locations: [],
      job: {
        type: "",
        level: 0,
        xp: 0
      },
      skills: [],
      mail: [],
      inventory: {
        armory: [],
        consumables: [],
        materials: []
      },
      arena: {
        points: 0,
        vs2: "",
        vs3: ""
      },
      equipment: {
        weapon: "na",
        armor: "na",
        ring: "na",
        neck: "na"
      },
      admin: {
        texture: "n",
        trigger: 0,
        material: 0,
        menu: "main"
      },
      action_buttons: {
        a_1: {
          type: "",
          id: ""
        },
        a_2: {
          type: "",
          id: ""
        },
        a_3: {
          type: "",
          id: ""
        },
        a_4: {
          type: "",
          id: ""
        },
        a_5: {
          type: "",
          id: ""
        },
        a_6: {
          type: "",
          id: ""
        }
      },
      attributes: {
        points: 0,
        stats: {
          hp: 0,
          hp_reg: 0,
          mp: 0,
          mp_reg: 0,
          dmg: 0,
          def: 0,
          crit: 0,
          dodge: 0,

          gold_extra: 0,
          xp_extra: 0
        }
      },
      selector: "action",
      isCombating: false,
      isCrafting: false,
      isArena: false,
      donation_points: 0,
      teleport_cd: 0
    };
    global.bot.createAcc[user] = acc;
    let message =
      "Bienvenido a el campamento de entrenamiento de heroes " +
      data.from.first_name +
      ".\nA continuación diganos sus caracteristicas y habilidades para " +
      "proporcionarle el entrenamiento adecuado a su rol.";
    const inline = {
      inline_keyboard: [[{ text: "Continuar ⏩", callback_data: "ca_start" }]]
    };

    global.bot.sendMessage(user, message, {
      reply_markup: inline,
      parse_mode: "Markdown"
    });
    return;
  } else {
    const opts = {
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
          { text: "🔁", callback_data: "a_center" },
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
    if (global.bot.users[user] == undefined)
      global.bot.users[user] = helper.readFile(
        config.DB + "/accounts/" + user + ".json"
      );
    //console.log(global.bot.users);
    global.bot.sendMessage(user, gameSurface(user), {parse_mode: "Markdown" , reply_markup: opts });
  }
});

module.exports = true;
