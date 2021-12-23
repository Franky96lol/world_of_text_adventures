const config = require('../../../config.js');
const gameSurface = require(config.LOGIC + '/commands/game/game_surface.js');
const helper = require(config.LOGIC + '/helper.js');
const WorldEngine = new (require(config.LOGIC + '/engine/map_generator.js'))();


global.bot.on('callback_query' , (data) => {
    let user = data.from.id;
    if(global.bot.users[user] == undefined) return;
    let opts;
    let _selector = {
    	    action : '👋🏻',
    	    attack : '🗡️',
    	    construction : '⚒️'
    }
    let selector = _selector[global.bot.users[user].selector];
    let message = '';
    let oldInline = global.bot.users[user].inline;
		 let pos = global.bot.users[user].pos;
		 let acc = global.bot.users[user];
    switch(data.data){
    	    
    	    case 'menu':
    	         message = '📖 **Menu**:\n\n' +
    	         '👤 **Nombre**: `' + acc.heroname + '` \t\t 🔝 **Nivel**: ' + acc.level + '\n' +
    	         '🔰 **Facción**: ' + helper.parseFaction(acc.faction) + '\n' +
    	         '⚔️ **Clase**: ' + helper.parseClass(acc.class) + '\n' +
    	         '🧠 **Experiencia**: ' + acc.xp + '/' + helper.parseXp(acc.level) + '\n' +
    	         '🗺️ **Posición**: ' + acc.pos._floor + ' `x: ' + acc.pos.x + ' y: ' + acc.pos.y + '`\n' +
    	         '👥 **Gremio**: ' + (acc.guild != '' ? acc.guild : '???');
    	         break;
    	     case 'menu_stadistics':
    	         let stats = (require(config.LOGIC + '/engine/stats_engine.js'))(user);
    	         message = '📃 **Estadisticas**:\n\n' +
    	         '👤 **Nombre**: `' + acc.heroname + '` \t\t 🔝 Nivel : ' + acc.level + '\n' +
    	         '🧠 **Experiencia**: ' + acc.xp + '/' + helper.parseXp(acc.level) + '\n' +
    	         '❤️ **Vida**: ' + acc.hp + '/' + stats.hp + '(+%' + (stats.hp_reg * 6) + '/m) \t ' +
    	         	'💠 **Mana**: ' + acc.mp + '/' + stats.mp + '(+%' + (stats.mp_reg * 6) + '/m) \n ';
    	     default :
    	         return;
    }
    
    opts = {
		     	   inline_keyboard : [
		     	       [{text : '📃 Estadisticas' , callback_data : 'menu_stadistics'},
		     	       {text : 'Atributos ➕' , callback_data : 'menu_atributes'}],
		     	       [{text : '🛡️ Equipamiento' , callback_data : 'menu_equipment'},
		     	       {text : 'Habilidades 🔮' , callback_data : 'menu_skills'}],
		     	       [{text : '☸️ Teleport' , callback_data : 'menu_teleport'},
		     	       {text : 'Gremio 👥' , callback_data : 'menu_guild'}],
		     	       [{text : '🚪 Desconectar' , callback_data : 'disconnect'},
		     	       {text : 'Donar 💵' , callback_data : 'menu_donate'}],
		     	       [{text : '↩️ Atras' , callback_data : 'menu_back'}]
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

