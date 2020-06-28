const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./botconfig.json");
const fs = require("fs");
const fivem = require('fivem-api');
const mysql = require('mysql');
const db = require('quick.db');
const request = require('request');
bot.commands = new Discord.Collection();

fs.readdir("./komendy/", (err, files) => {
	if(err) console.log(err)
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
		console.log("Brak Komendy");
		return;
	}
	
	jsfile.forEach((f, i) => {
		let props = require(`./komendy/${f}`);
		console.log(`${f} Został załadowany!`);
		bot.commands.set(props.help.name, props);
	});
	
});
	
bot.on('guildMemberAdd', member => {

  var role = member.guild.roles.find('name', '💧 | Imigrant');
  member.addRole(role);
});


  bot.on("ready", async () => {
    const channel = bot.channels.get(config.kanalst);
    const message = await channel.fetchMessage(config.wiadomoscst);
    setInterval(async () => {
        request(`http://${config.ipst}/players.json`, async (error, _, body) => {
            if (error){
                const embed = new Discord.RichEmbed()
                    .setColor(`${config.kolorst}`)
                    .setTitle('SERWER WYLACZONY')
                    .addField('Adres:', `${config.ipst}`, true)
                    .setFooter(`${config.nazwafoost}`, bot.user.displayAvatarURL)
                    .setTimestamp();
                    return await message.edit(embed);
             }
            const players = JSON.parse(body);
            playersStringList = [];
            let buff = "";
            for(const player of players){
                const paddedId = new String(player.id).padStart(3, '0');
                const steamHex = player.identifiers[0];
                const playerString = `${paddedId}     ${player.name} (${steamHex})\n`;
                if((buff.length + playerString.length) > 1024) {
                    playersStringList.push(buff);
                    buff = "";
                }
                buff += playerString;
            }
            playersStringList.push(buff);
            const embed = new Discord.RichEmbed()
                .setColor(`${config.kolorst}`)
                .setTitle(`${config.nazwaglst}`)
                .addField("Adres:", `${config.ipst}`, true)
                .addField("Gracze:", `${players.length}/${config.maksst}`, true)
                .setFooter(`${config.nazwafoost}`, bot.user.displayAvatarURL)
                .setTimestamp();
            for(let i = 0; i < playersStringList.length; i++){
                embed.addField(`Lista ${i + 1}/${playersStringList.length}`, playersStringList[i]);
            }
            return await message.edit(embed);
            
        });
    },10 * 1000);
});
  
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Aktywność bota

  bot.on("ready", async () => {
	  
    console.log(`${bot.user.username} jest dostępny na ${bot.guilds.size} serwerach!`);
	await request(`http://51.75.41.124:30120/players.json`, async (error, response, playerss) => {
                    players = JSON.parse(playerss);
	bot.user.setActivity(`${players.length}/48 Graczy`), {type: "PLAYING"};  
	});
  });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////AUTO ODPOWIADANIE//////////////////////////////////////////////////////////////////////////////////////////


bot.on('message', (message) => {

if(message.content.includes('ip')) {
	message.channel.sendMessage('51.75.41.124:30120');
}
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.login(config.token);
