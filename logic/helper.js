const fs = require('fs');
const config = require('../config.js');

function readFile(path){
	   try{
	       return JSON.parse(fs.readFileSync(path , 'utf-8'));
	   }catch(err){
	   	    console.log(err);
	   	    return null;
	   }
}

function parseXp(level){
	   return (Math.pow(level , 3) * 4) + 65;
}

function writeFile(path , file){
	   fs.writeFileSync(path , JSON.stringify(file));
}



function parseRange(range){
    const ranges = {
    	    1 : '๐',
    	    2 : '๐ฅ',
    	    3 : '๐ฅ',
    	    4 : '๐ฅ',
    	    5 : '๐'
    	
    }	
    return ranges[range];
}

function parseHeroIcon(user){
	   let faction = bot.users[user].faction;
	   let hclass = bot.users[user].class;
	   
	   const icons = {
	   	    celestial : {
	   	    	    warrior : '๐ฅท',
	   	    	    archer : '๐ง๐ปโโ๏ธ',
	   	    	    druid : '๐งโโ๏ธ',
	   	    	    mage : '๐ง๐ปโโ๏ธ'
	   	    },
	   	    infernal : {
	   	    	    warrior : '๐ง๐ปโโ๏ธ',
	   	    	    archer : '๐ง๐ฟโโ๏ธ',
	   	    	    druid : '๐งโโ๏ธ',
	   	    	    mage : '๐ง๐ฟโโ๏ธ'
	   	    	}
	   	}
	   	return icons[faction][hclass];
}

function percent(num , percent){
	   return (num / 100) * percent;
}

function parseItemType(type){
	   const types = {
	   	    weapon : 'โ๏ธ Arma โ๏ธ',
	   	    armor : '๐ก๏ธ Armadura ๐ก๏ธ',
	   	    potion : '๐งช Pociรณn ๐งช',
	   	    scroll : '๐๏ธ Pergamino ๐๏ธ',
	   	    artifact : '๐บ Artefacto ๐บ'
	   };
	   
	   return types[type];
}

function parseQuality(quality){
	   const qualitys = {
	   	    1 : 'โป๏ธ',
	   	    2 : '๐ท',
	   	    3 : 'โฆ๏ธ',
	   	    4 : '๐ถ'
	   	}
	   	
	   	return qualitys[quality];
}

function parseTime(_secs) { 
	    const secs = ('0' + (Math.round(_secs % 0x3C)).toString()).slice(-2); 
	    const hours = ('0' + (Math.floor(_secs / 0xE10)).toString()).slice(-2); 
	    const minutes = ('0' + (Math.floor(_secs / 0x3C ) % 0x3C).toString()).slice(-2); 
	    
	    return hours + ':' + minutes + ':' + secs; 
}

function parseClass(__class){
	   let _class = readFile(config.DB + '/classes/' + __class + '.json');
		 	return   _class.name;
	
}

function parseFaction(_faction){
	   let faction = readFile(config.DB + '/factions/' + _faction + '.json');
		 	return   faction.name;
	
}


module.exports = {
    readFile : readFile,
    writeFile : writeFile,
    percent : percent,
    parseTime : parseTime,
    parseItemType : parseItemType,
    parseQuality : parseQuality,
    parseXp,
    parseHeroIcon,
    parseFaction,
    parseClass
};
