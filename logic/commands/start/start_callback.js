const config = require('../../../config.js');
const helper = require(config.LOGIC + '/helper.js');
const fs = require('fs');
const stats_engine = require(config.LOGIC + '/engine/stats_engine.js');


global.bot.on('callback_query' , (data) => {
    let user = data.from.id;
    //console.log(data);
    if(data.message.chat.type != 'private') return;
    
		 let old_message = data.message.text;
    switch(data.data){
    	    case 'ca_start':
    	        startMenu(user , data.message.chat.id , data.message.message_id , old_message);
    	        break;
    	    case 'ca_celestial':
    	        global.bot.createAcc[user].faction = 'celestial';
    	        startMenu(user , data.message.chat.id , data.message.message_id , old_message);
    	        break;
    	    case 'ca_infernal':
    	        global.bot.createAcc[user].faction = 'infernal';
    	        startMenu(user , data.message.chat.id , data.message.message_id , old_message);
    	        break;
    	    case 'ca_warrior':
    	        global.bot.createAcc[user].class = 'warrior';
    	        startMenu(user , data.message.chat.id , data.message.message_id , old_message);
    	        break;
    	    case 'ca_archer':
    	        global.bot.createAcc[user].class = 'archer';
    	        startMenu(user , data.message.chat.id , data.message.message_id , old_message);
    	        break;
    	    case 'ca_druid':
    	        global.bot.createAcc[user].class = 'druid';
    	        startMenu(user , data.message.chat.id , data.message.message_id , old_message);
    	        break;
    	    case 'ca_mage':
    	        global.bot.createAcc[user].class = 'mage';
    	        startMenu(user , data.message.chat.id , data.message.message_id , old_message);
    	        break;
    	    case 'ca_continue':
    	        global.bot.deleteMessage(user , data.message.message_id);
    	        global.bot.sendMessage(user , '📝 Inserte su nombre heroe :\n\n'+
    	        '⚠️ No puede contener:\n' +
    	        '- Espacios. \n' +
    	        '- Caracteres Especiales.\n' +
    	        '- Emojis.\n' +
    	        '- Debe tener de 4 a 14 digitos.');
    	        global.bot.createAcc[user].insert_name = true;
    	        break;
    	    case 'ca_accept':
    	        global.bot.deleteMessage(user , data.message.message_id);
    	        helper.writeFile(config.DB + '/accounts/' + user + '.json' , global.bot.createAcc[user]);
    	        let hero = {owner : user};
    	        helper.writeFile(config.DB + '/heros/' + global.bot.createAcc[user].heroname + '.json' , hero);
    	        let acc = helper.readFile(config.DB + '/accounts/' + user + '.json');
    	        global.bot.users[user] = acc;
    	        let hstats = stats_engine.stats(user);
    	        global.bot.users[user].stats.hp = hstats.hp;
    	        global.bot.users[user].stats.mp = hstats.mp;
    	        if(!global.bot.users[user]){
    	        	
    	        }else{
    	        	   global.bot.sendMessage(user , '📜 El heroe `' + global.bot.users[user].heroname + '` a aparecido en el mundo.');
    	        	   global.bot.sendMessage(user , '💌 Para acceder al mundo utilice el comando /login');
    	        	   
    	        }
    	        break
    	        
    }
    
    
});

global.bot.on('message' , (data) => {
	   let user = data.from.id;
	   if(data.text == '/start') return;
	   if(global.bot.createAcc[user] != undefined){
	       if(global.bot.createAcc[user].insert_name){
	   	        
	   	        let char = /^[a-zA-Z0-9]+$/;
	   	        if(!char.test(data.text) || data.text.length < 4 || data.text.length > 14){
	   	        	   global.bot.sendMessage(user ,  '⚠️ No siguio los pasos mencionados al escribir su nombre. \n\n📝 Inserte su nombre nuevamente :\n\n'+
    	            '⚠️ Recuerde que no puede contener:\n' +
    	            '- Espacios. \n' +
    	            '- Caracteres Especiales.\n' +
    	            '- Emojis.\n' +
    	            '- Debe tener de 4 a 14 digitos.');
 	   	        }else{
	   	        	   delete global.bot.createAcc[user].insert_name;
	   	            global.bot.createAcc[user].heroname = data.text;
	   	            
	   	            if(fs.existsSync(config.DB + '/heros/' + data.text + '.json')){
	   	            	    global.bot.sendMessage(user ,  '⚠️ El nombre `' + data.text + '` ya existe en el mundo. \n\n📝 Inserte su nombre nuevamente :\n\n'+
    	                '⚠️ Recuerde que no puede contener:\n' +
    	                '- Espacios. \n' +
    	                '- Caracteres Especiales.\n' +
    	                '- Emojis.\n' +
    	                '- Debe tener de 4 a 14 digitos.');
	   	            }
	   	            let hclass , faction;
	   	            if(global.bot.createAcc[user].class != '?') {
		 	                let _class = helper.readFile(config.DB + '/classes/' + global.bot.createAcc[user].class + '.json');
		 	                hclass = _class.name ;
		             	}
		 	
		 	            if(global.bot.createAcc[user].faction != '?') {
		 	                let fact = helper.readFile(config.DB + '/factions/' + bot.createAcc[user].faction + '.json');
		 	                faction = fact.name ;
		 	            }
		 
                 let message = '📝 Esta es su ficha de heroe : \n\n' +
    	             '👤 Nombre : `' + global.bot.createAcc[user].heroname + '`\n\n' +
    	             '🔰 Facción : ' + faction + '\n\n' +
    	             '⚔️ Clase : ' + hclass + '\n\n' +
    	             '⚠️ Esta acción no se puede deshacer , si no son los roles que deseas simplemente inserte el comando /start para volver a insertar tus datos , desea continuar con esta ficha de heroe?.';
    
	   	            	const inline = { 
		                  inline_keyboard: [ 
		                      [{text : '✅ Aceptar' , callback_data : 'ca_accept'}]
	                   ]
		             };
		     
		             global.bot.sendMessage(user , message , {reply_markup : inline , parse_mode : 'Markdown'});
		             return;
	   	        }
	   	        return;
	       }	
	   }
});

function startMenu(user , chatid , messageid ,old_message){
    
    let inline;
    inline = { 
		          inline_keyboard: [ 
		              [{text : '🔰 Facción 🔰' , callback_data : '__race__'}],
		              [{text : '⚜️ Celestial' , callback_data :'ca_celestial'},
		               {text : 'Infernal 🔱' , callback_data :'ca_infernal'}],
		              [{text : '⚔️ Clase ⚔️' , callback_data : '__class__'}],
		              [{text : '🛡️ Guerrero' , callback_data :'ca_warrior'},
		               {text : 'Arquero 🏹' , callback_data :'ca_archer'}],
		              [{text : '🐾 Druida' , callback_data :'ca_druid'},
		               {text : 'Mago 🔮' , callback_data :'ca_mage'}]
	           ]
		 };
    
    if(global.bot.createAcc[user].faction != '?' && global.
bot.createAcc[user].class != '?'){
		 	   inline.inline_keyboard.push([{text : 'Continuar ⏩' , callback_data : 'ca_continue'}]);
		 }
		 let hclass = '???' , faction = '???';
		 
		 if(global.bot.createAcc[user].class != '?') {
		 	    let _class = helper.readFile(config.DB + '/classes/' + global.bot.createAcc[user].class + '.json');
		 	    hclass = _class.name + '\n📜 ' + _class.desc;
		 	}
		 	
		 	if(global.bot.createAcc[user].faction != '?') {
		 	    let fact = helper.readFile(config.DB + '/factions/' + global.bot.createAcc[user].faction + '.json');
		 	    faction = fact.name + '\n📜 ' + fact.desc;
		 	}
		 
    let message = '📝 Rellene su formulario para continuar : \n\n' +
    	             '👤 Nombre : `' + global.bot.createAcc[user].heroname + '`\n\n' +
    	             '🔰 Facción : ' + faction + '\n\n' +
    	             '⚔️ Clase : ' + hclass + '\n\n' +
    	             '⚠️ El nombre de su heroe se podra insertar luego de elegir su rol.';
    
    if(old_message != message.replace(/\*\*/g , '').replace(/`/g , '')){
    	    
        global.bot.editMessageText(message, 
 	          { chat_id: chatid, 
           	message_id: messageid, 
           	parse_mode : 'Markdown',
 	           reply_markup : inline });
 	           return;
 	   }
 	   return;
}
