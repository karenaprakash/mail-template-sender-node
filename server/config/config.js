/**
 * main configuration file
 */
const config = {
   production :{
       SECRET : 'SUPERSECRETPASSWORD123',
       DATABASE : 'mongodb://192.168.42.135:27017/TemplateEmailNode'
   },
   default : {
       SECRET : 'SUPERSECRETPASSWORD123',
       DATABASE : 'mongodb://localhost:27017/TemplateEmailNode'
   }
}

exports.get = function get(env){
   return config[env] || config.default
}

//mongodb://rao:raoinfotech@54.185.16.135:27017/meme-generator"