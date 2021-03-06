const config = require('../../../config.js');
const gameSurface = require(config.LOGIC + '/commands/game/game_surface.js');
const helper = require(config.LOGIC + '/helper.js');
const WorldEngine = new (require(config.LOGIC + '/engine/map_generator.js'))();


global.bot.on('callback_query' , (data) => {
    let user = data.from.id;
    if(global.bot.users[user] == undefined) return;
    let opts;
    let _selector = {
    	    action : '๐๐ป',
    	    attack : '๐ก๏ธ',
    	    construction : 'โ๏ธ'
    }
    let selector = _selector[global.bot.users[user].selector];
    let message = '';
    let oldInline = global.bot.users[user].inline;
		 let pos = global.bot.users[user].pos;
		 let acc = global.bot.users[user];
    switch(data.data){
    	    
    	    case 'menu':
    	         message = '๐ **Menu**:\n\n' +
    	         '๐ค **Nombre**: `' + acc.heroname + '` \t\t ๐ **Nivel**: ' + acc.level + '\n' +
    	         '๐ฐ **Facciรณn**: ' + helper.parseFaction(acc.faction) + '\n' +
    	         'โ๏ธ **Clase**: ' + helper.parseClass(acc.class) + '\n' +
    	         '๐ง  **Experiencia**: ' + acc.xp + '/' + helper.parseXp(acc.level) + '\n' +
    	         '๐บ๏ธ **Posiciรณn**: ' + acc.pos._floor + ' `x: ' + acc.pos.x + ' y: ' + acc.pos.y + '`\n' +
    	         '๐ฅ **Gremio**: ' + (acc.guild != '' ? acc.guild : '???');
    	         break;
    	     case 'menu_stadistics':
    	         let stats = (require(config.LOGIC + '/engine/stats_engine.js'))(user);
    	         message = '๐ **Estadisticas**:\n\n' +
    	         '๐ค **Nombre**: `' + acc.heroname + '` \t\t ๐ Nivel : ' + acc.level + '\n' +
    	         '๐ง  **Experiencia**: ' + acc.xp + '/' + helper.parseXp(acc.level) + '\n' +
    	         'โค๏ธ **Vida**: ' + acc.hp + '/' + stats.hp + '(+%' + (stats.hp_reg * 6) + '/m) \t ' +
    	         	'๐  **Mana**: ' + acc.mp + '/' + stats.mp + '(+%' + (stats.mp_reg * 6) + '/m) \n ';
    	     default :
    	         return;
    }
    
    opts = {
		     	   inline_keyboard : [
		     	       [{text : '๐ Estadisticas' , callback_data : 'menu_stadistics'},
		     	       {text : 'Atributos โ' , callback_data : 'menu_atributes'}],
		     	       [{text : '๐ก๏ธ Equipamiento' , callback_data : 'menu_equipment'},
		     	       {text : 'Habilidades ๐ฎ' , callback_data : 'menu_skills'}],
		     	       [{text : 'โธ๏ธ Teleport' , callback_data : 'menu_teleport'},
		     	       {text : 'Gremio ๐ฅ' , callback_data : 'menu_guild'}],
		     	       [{text : '๐ช Desconectar' , callback_data : 'disconnect'},
		     	       {text : 'Donar ๐ต' , callback_data : 'menu_donate'}],
		     	       [{text : 'โฉ๏ธ Atras' , callback_data : 'menu_back'}]
		     	   ]
		 };
    global.bot.users[user].inline = 120;
    
    if(global.bot.users[user].message != message  || oldInline != global.bot.users[user].inline){
    	    global.bot.users[user].message =  message;
        global.bot.editMessageText(global.bot.users[user].message, 
 	          { chat_id: data.message.chat.id, 
           	message_id: data.message.message_id, 
 	           reply_markup : opts ,
 	           parse_mode : 'Markdown'});
 	   }
});

