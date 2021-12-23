const config = require('../../../config.js');
const helper = require(config.LOGIC + '/helper.js');
const fs = require('fs');
const WorldEngine = require(config.LOGIC + '/engine/map_generator.js');
const worldEngine = new WorldEngine();

function gameSurface(user){
    let acc = global.bot.users[user];
    let textures = helper.readFile(config.DB + '/textures.json');
    let banner = '';
    if(acc.acctype == 2) banner = 'Pos f:' + acc.pos._floor + ' x:' + acc.pos.x + ' y:' + acc.pos.y + ' \n' +
    'Textura: ' + textures[acc.admin.texture]  + '\n' +
    'Densidad: ' + acc.admin.material + ' \n' +
    'Trigger: ' + acc.admin.trigger + '\n\n';
    else banner = '❤️ : ' + acc.stats.hp + ' \t \t \t 💠 : ' + acc.stats.mp + '\n\n';
    let surface = worldEngine.addGFX(acc.pos , global.World , user);
    let sub_banner = '';
    
    return banner + surface + sub_banner;
}

module.exports = gameSurface;