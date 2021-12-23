//Configuracion principal del servidor
const config = {
    URL : 'world_of_text_bot', 
    PORT : process.env.PORT || 8081,//puerto de escucha
    DIRNAME : __dirname, //directorio raiz
    DB : __dirname + '/database', //path a la base de datos
    LOGIC : __dirname + '/logic', //path a la logica
    TOKEN : 'TelegramToken',
    server : {
    	    version : 'v0.0.1'
    }
};

module.exports = config;
