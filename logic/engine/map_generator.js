const config = require("../../config.js");
const helper = require(config.LOGIC + "/helper.js");

class Map {
  constructor(floors, x, y) {
    this.floors = floors;
    this.x = x;
    this.y = y;
  }

  generate() {
    let _map = [];
    for (let _floor = 0; _floor < this.floors; _floor++) {
      let _map1 = [];
      for (let _x = 0; _x < this.x; _x++) {
        let _map2 = [];
        for (let _y = 0; _y < this.y; _y++) {
          if (_x == 0 || _x == this.x - 1 || _y == 0 || _y == this.y - 1) {
            if (_floor == 0) _map2.push({ t: "f", m: 3, g: 0 });
            if (_floor == 1) _map2.push({ t: "w", m: 3, g: 0 });
            if (_floor == 2) _map2.push({ t: "a", m: 3, g: 0 });
          } else {
            _map2.push({ t: "n", m: 0, g: 0 });
          }
        }
        _map1.push(_map2);
      }
      _map.push(_map1);
    }
    return _map;
  }

  addGFX(pos, _map, user) {
    let textures = helper.readFile(config.DB + "/textures.json");
    let gfxMap = "\t \t \t \t \t \t \t \t \t \t";
    let poa = this.getPlayersOnArea(pos, global.bot.users);
    let posx = 0,
      posy = 0;
    let maplx = _map[pos._floor].length;
    let maply = _map[pos._floor][pos.x].length;
    if (pos.x - 4 < 0) posx = 4 - pos.x;
    if (pos.y - 4 < 0) posy = 4 - pos.y;
    if (pos.x + 5 > maplx) posx = maplx - (pos.x + 5);
    if (pos.y + 5 > maply) posy = maply - (pos.y + 5);

    for (let x = pos.x + posx - 4; x < pos.x + posx + 5; x++) {
      for (let y = pos.y + posy - 4; y < pos.y + posy + 5; y++) {
        let poab = false;
        for (let pj of poa) {
          if (pj.pos.x == x && pj.pos.y == y) {
            poab = helper.parseHeroIcon(pj.id);
          }
        }
        if (poab != false && (x != pos.x && y != pos.y)) {
          gfxMap += poab;
        } else if (pos.x != x || pos.y != y) {
          gfxMap += textures[_map[pos._floor][x][y].t];
        } else gfxMap += helper.parseHeroIcon(user);
      }
      gfxMap += "\n\t \t \t \t \t \t \t \t \t \t";
    }
    return gfxMap;
  }

  edit(pos, _map, texture, material, trigger) {
    _map[pos._floor][pos.x][pos.y] = { t: texture, m: material, g: trigger };
  }

  getPlayersOnArea(pos, players) {
    let poa = [];
    for (let pj in players) {
      if (
        players[pj].pos.x > pos.x - 5 &&
        players[pj].pos.x < pos.x + 6 &&
        players[pj].pos.y > pos.y - 5 &&
        players[pj].pos.y < pos.y + 6 &&
        players[pj].pos._floor == pos._floor

      ) {
        poa.push(players[pj]);
      }
    }
    return poa;
  }
}

module.exports = Map;
