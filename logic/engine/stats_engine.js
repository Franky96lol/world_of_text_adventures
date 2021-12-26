const config = require("../../config.js");
const helper = require(config.LOGIC + "/helper.js");
const fs = require("fs");
const _attr = require(config.DB + "/attributes.json");

function stats(username) {
  let acc = global.bot.users[username];
  let equipment = acc.equipment;
  let _class = helper.readFile(config.DB + "/classes/" + acc.class + ".json");

  let ret = {
    hp: 0,
    mp: 0,
    hp_reg: 0,
    mp_reg: 0,
    dmg: 0,
    def: 0,
    crit: 0,
    dodge: 0,

    xp_extra: 0,
    gold_extra: 0
  };

  for (let r in ret) {
    ret[r] +=
      _class[r] +
      _class[r + "_lvl"] * acc.level +
      acc.attributes.stats[r] * _attr[r];
  }

  if (acc.faction == "celestial") ret.gold_extra += 5;
  if (acc.faction == "infernal") ret.xp_extra += 5;

  for (let equip in equipment) {
    let item = helper.readFile(
      config.DB + "/items/" + equipment[equip] + ".json"
    );
    for (let r in ret) {
      ret[r] += item[r];
    }
  }

  for (let r in ret) {
    ret[r] = ret[r].toFixed(2);
  }

  return ret;
}

module.exports = {
  stats
};
