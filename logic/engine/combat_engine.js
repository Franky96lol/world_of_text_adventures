const config = require('../../config.js');
const helper = require(config.LOGIC + '/helper.js');
const fs = require('fs');

class Combat{
    loadSkills(){
       let _skills = fs.readdirSync(config.DB + '/skills/');
       for(let skill of _skills){
          global.skills[skill.replace('.json' , '')] = helper.readFile(config.DB + '/skills/' + skill);
       }
       console.log('DB skills loaded...');
    }
  
}

module.exports = Combat;