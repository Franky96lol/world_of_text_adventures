const config = require('../../../config.js');
const helper = require(config.LOGIC + '/helper.js');
const fs = require('fs');
const gameSurface = require(config.LOGIC + '/commands/game/game_surface.js');

global.bot.onText(/^\/tele.*/ , (data) => {
    let user = data.from.id;
    if(data.chat.type != 'private') return;
    if(fs.existsSync(config.DB + '/accounts/' + user + '.json')){
    	    if(global.bot.users[user] == undefined) return;
    	    if(global.bot.users[user].acctype ==2){
    	    	  let coord = data.text.split(' ');
    	    	  if(coord.length == 4){
    	    	  	   if(parseInt(coord[1]) < 0 || parseInt(coord[1]) >= global.World.length) return;
    	    	  	   if(parseInt(coord[2]) < 0 || parseInt(coord[2]) >= global.World[parseInt(coord[1])].length) return;
    	    	  	   if(parseInt(coord[3]) < 0 || parseInt(coord[3]) >= global.World[parseInt(coord[1])][parseInt(coord[2])].length) return;
    	    	  	   global.bot.users[user].pos._floor = parseInt(coord[1]);
    	    	  	   global.bot.users[user].pos.x = parseInt(coord[2]);
    	    	  	   global.bot.users[user].pos.y = parseInt(coord[3]);
    	    	  	   global.bot.sendMessage(user , 'Teletransportado a piso:' + coord[1] + ' x:' + coord[2] + ' y:' + coord[3]);
    	    	  	   return;
    	    	  }else return;
    	    	  return;
    	    }
    }else return;
});
