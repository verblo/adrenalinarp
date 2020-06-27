const { RichEmbed } = require('discord.js');
const config = require("../botconfig.json");
exports.run = (bot, msg, args) => {
  const embed = new RichEmbed()
     .setTitle("Komendy Dostępne Dla Uzytkowników:")
     .addField("^ass","Wysyła zdjęcie tyłka.")
     .addField("^pussy","Wysyła zdjęcie pochwy.")
     .addField("^hentai","Wysyła zdjęcie hentai.")
     .addField("^holo","Wysyła zdjęcie holo.")
     .addField("^thigh","Wysyłą zdjęcie thigh.")
     .addField("^gif","Wysyła porngif.")
     .addField("^4k","Wysyła zdjęcie 4k porn.")
     .addField("^anal","wysyła zdjęcie anal.")
     .setTimestamp()
   msg.channel.send(embed);
};

    module.exports.help = {
    
      name:`${config.helpcommand}`
    
    }