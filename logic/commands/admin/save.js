const config = require('../../../config.js');
const helper = require(config.LOGIC + '/helper.js');
const fs = require('fs');
const gameSurface = require(config.LOGIC + '/commands/game/game_surface.js');

global.bot.onText(/^\/save.*/ , (data) => {
    let user = data.from.id;
    if(data.chat.type != 'private') return;
    if(fs.existsSync(config.DB + '/accounts/' + user + '.json')){
    	    if(global.bot.users[user] == undefined) return;
    	    if(global.bot.users[user].acctype ==2){
    	    	  let coord = data.text.split(' ');
    	    	  if(coord.length == 2){
    	    	  	   switch(coord[1]){
    	    	  	   	    case 'users':
    	    	  	   	        for(let _user in global.bot.users){
    	    	  	   	        	   helper.writeFile(config.DB + '/accounts/' + _user + '.json' , global.bot.users[_user]);
    	    	  	   	        	   //helper.writeFile(config.DB + '/backup/accounts/' + _user + '.json' , global.bot.users[_user]);
    	    	  	   	        }
    	    	  	   	        global.bot.sendMessage(user , 'Base de Datos "accounts" guardada correctamente');
    	    	  	   	        break;
    	    	  	   	    case 'world':
    	    	  	   	        helper.writeFile(config.DB + '/world_map.json' , global.World);
    	    	  	   	        //helper.writeFile(config.DB + '/backup/world_map.json' , global.World);
    	    	  	   	        global.bot.sendMessage(user , 'Mundo guardado correctamente');
    	    	  	   	        break;
    	    	  	   	}
    	    	  	   return;
    	    	  }else return;
    	    	  return;
    	    }
    }else return;
});
