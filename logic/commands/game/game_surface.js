const config = require("../../../config.js");
const helper = require(config.LOGIC + "/helper.js");
const fs = require("fs");
const WorldEngine = require(config.LOGIC + "/engine/map_generator.js");
const worldEngine = new WorldEngine();
const _stats = require(config.LOGIC + "/engine/stats_engine.js");

function gameSurface(user) {
  let acc = global.bot.users[user];
  let stats = _stats.stats(user);
  
  let textures = helper.readFile(config.DB + "/textures.json");
  let banner = "";
  if (acc.acctype == 2)
    banner =
      "Pos f:" +
      acc.pos._floor +
      " x:" +
      acc.pos.x +
      " y:" +
      acc.pos.y +
      " \n" +
      "Textura: " +
      textures[acc.admin.texture] +
      "\n" +
      "Densidad: " +
      acc.admin.material +
      " \n" +
      "Trigger: " +
      acc.admin.trigger +
      "\n\n";
  else{
    banner = "🗺️ **Zona**: ⛰️ `x:" + acc.pos.x + " y:" + acc.pos.y + "`\n\n";
    let poa = worldEngine.getPlayersOnArea(acc.pos , global.bot.users);
    let enemies = [];
    let alies = [];
    for(let pj in poa){
      if(poa[pj].faction == acc.faction && poa[pj].id != user && alies.length < 10){
        alies.push(poa[pj]);
      }
      else if(poa[pj].faction != acc.faction && poa[pj].id != user && enemies.length < 10){
        enemies.push(poa[pj]);
      }
    }
    let _max = Math.max(alies.length , enemies.length);
    for(let x = 0 ; x < _max ; x++){
         let ally = '', enem = '' , ally2 = '' , enem2= '';
         if(alies[x] != undefined && alies[x].id != user){
           ally = helper.parseHeroIcon(alies[x].id) + " `" + alies[x].heroname + 
             "`\t\t\t\t\t\t\t\t\t\t";
           ally2 = "❤️: " + Math.floor(alies[x].stats.hp) + "/" + Math.floor(_stats.stats(alies[x].id).hp) +
             "\t\t\t\t\t\t\t\t\t\t";
         }else{
           ally = "\t \t \t \t \t \t \t \t \t \t \t \t \t \t \t \t";
           ally2 = ally;
         }
         if(enemies[x] != undefined && enemies[x].id != user){
           enem = helper.parseHeroIcon(enemies[x].id) + " `" + enemies[x].heroname + 
             "`\n";
           enem2 = "❤️: " + Math.floor(enemies[x].stats.hp) + "/" + Math.floor(_stats.stats(enemies[x].id).hp) +
             "\n";
         }else{
           enem = "\n";
           enem2 = "\n";
         }
         if(ally.length > ally2.length){
           let spaces = ally.length - ally2.length;
           for(let x = 0 ; x <= spaces ; x++){
             ally2 += " ";
           }
         }else{
            let spaces = ally2.length - ally.length;
           for(let x = 0 ; x <= spaces ; x++){
             ally += " ";
           }
         }
         banner += ally + enem + ally2 + enem2 ;
    }
  }
  let surface = worldEngine.addGFX(acc.pos, global.World, user);
  let sub_banner = "\n\t\t\t\t\t\t\t\t\t\t\t🔝 **Nivel**:" + acc.level + "\t \t \t \t 🧠**XP**: " +  acc.xp + "/" + helper.parseXp(acc.level) + 
     "\n\t\t\t\t\t\t\t\t\t\t\t❤️: " + Math.floor(acc.stats.hp) + "/" + Math.floor(stats.hp) +
     '\t \t \t \t \t 💠: ' + Math.floor(acc.stats.mp) + '/' + Math.floor(stats.mp) ;

  return banner + "\n" + surface + sub_banner;
}

module.exports = gameSurface;
