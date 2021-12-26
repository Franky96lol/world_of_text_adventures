const fs = require("fs");
const config = require("../config.js");

function readFile(path) {
  try {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
  } catch (err) {
    console.log(err);
    return null;
  }
}

function parseXp(level) {
  return Math.pow(level, 3) * 4 + 65;
}

function writeFile(path, file) {
  fs.writeFileSync(path, JSON.stringify(file));
}

function parseSta(sta) {
  const stad = {
    hp: "❤️ Vida",
    hp_reg: "❣️ Reg.Vida",
    mp: "💠 Mana",
    mp_reg: "🔷 Reg. Mana",
    dmg: "🗡️ Daño",
    def: "🛡️ Defensa",
    crit: "💘 Critico",
    dodge: "🌀Esquiva",
    xp_extra: "🧠 Xp. Extra",
    gold_extra: "💰 Oro Extra"
  };
  return stad[sta];
}

function parseRange(range) {
  const ranges = {
    1: "👑",
    2: "🥇",
    3: "🥈",
    4: "🥉",
    5: "🏅"
  };
  return ranges[range];
}

function parseHeroIcon(user) {
  let faction = global.bot.users[user].faction;
  let hclass = global.bot.users[user].class;

  const icons = {
    celestial: {
      warrior: "🥷",
      archer: "🧝🏻‍♂️",
      druid: "🧞‍♂️",
      mage: "🧙🏻‍♂️"
    },
    infernal: {
      warrior: "🧛🏻‍♂️",
      archer: "🧝🏿‍♂️",
      druid: "🧟‍♂️",
      mage: "🧙🏿‍♂️"
    }
  };
  return icons[faction][hclass];
}

function percent(num, percent) {
  return (num / 100) * percent;
}

function parseItemType(len , type) {
  const types = {
    long: {
      none : "👋🏻 Nada",
      weapon: "🗡️ Arma",
      armor: "🛡️ Armadura",
      neck: "📿 Collar",
      ring: "💍 Anillo",
      potion: "🧪 Poción",
      scroll: "🗞️ Pergamino",
      artifact: "🏺 Artefacto"
    },
    short: {
      none : "👋🏻",
      weapon: "🗡️",
      armor: "🛡️",
      neck: "📿",
      ring: "💍",
      potion: "🧪",
      scroll: "🗞️",
      artifact: "🏺"
    }
  };

  return types[len][type];
}

function parseQuality(quality) {
  const qualitys = {
    1: "◻️",
    2: "🔷",
    3: "♦️",
    4: "🔶"
  };

  return qualitys[quality];
}

function parseTime(_secs) {
  const secs = ("0" + Math.round(_secs % 0x3c).toString()).slice(-2);
  const hours = ("0" + Math.floor(_secs / 0xe10).toString()).slice(-2);
  const minutes = ("0" + (Math.floor(_secs / 0x3c) % 0x3c).toString()).slice(
    -2
  );

  return hours + ":" + minutes + ":" + secs;
}

function parseClass(__class) {
  if(__class == 'none') return "Todas";
  let _class = readFile(config.DB + "/classes/" + __class + ".json");
  return _class.name;
}

function parseFaction(_faction) {
  
  let faction = readFile(config.DB + "/factions/" + _faction + ".json");
  return faction.name;
}

module.exports = {
  readFile: readFile,
  writeFile: writeFile,
  percent: percent,
  parseTime: parseTime,
  parseItemType: parseItemType,
  parseQuality: parseQuality,
  parseXp,
  parseHeroIcon,
  parseFaction,
  parseClass,
  parseSta
};
