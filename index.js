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

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});
	

//TESTOWE///

// bot.on("ready", async () => {
// 	    fivem.getServerInfo("51.83.71.65:30120").then(async server  => {
//     bot.user.setActivity(server.players.length + "/32").catch(async error => {
// bot.user.setActivity("Serwer Offline")})
// }, 10*1000).catch((err) => console.log(err)); 
// });

bot.on('message', (msg) => {
  if (msg.author.bot) return;
  let prefix = config.prefix;
  if (msg.content.startsWith(`${prefix}${config.wlcommand}`) && msg.channel.type !== 'dm') {
    let guild = bot.guilds.get(config.guildidwl);
    console.log(`${msg.channel.name}`)
    if (msg.channel.name.startsWith(config.kanalwl) )
    {
      //con.end();
      var con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});
      con.connect(function(err) {
      if (err) throw err;
      console.log("Połączono z Bazą Danych!");
      });
      const filtered = msg.content.replace("!dodaj", "steam:").replace(" ", "");
      var sql = `INSERT INTO whitelist (identifier) VALUES ('${filtered}')`;
  con.query(sql, function (err, result) {
      if (err) { 
        if (err.code == "ECONNRESET") 
        {
        msg.reply(":x: Error")

        }
        else if (err.code == "ER_DUP_ENTRY")
        {
            msg.reply(`:x: Podany steamID (${filtered}) znajduje się już na WL`) 
        }
      }
      else
      {
      msg.reply(`:white_check_mark: ${filtered} dodany do whitelist`)
      console.log(`Dodano do Whitelist SteamID: ${filtered}`);
      }
      con.end();
      
    
    });
      }
    }
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
			bot.user.setActivity(`${players.length}/48 Graczy`), {type: "PLAYING"};
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
	//await request(`http://51.75.41.124:30120/players.json`, async (error, response, playerss) => {
    //                players = JSON.parse(playerss);
					
   // setInterval(async () => {
   //     bot.user.setActivity(`${players.length}/48 Graczy`), {type: "PLAYING"};  
    //},10 * 1000);
	
//	});
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Support system

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////

bot.on('message', (message) => {

if(message.content.includes('ip')) {
	message.channel.sendMessage('51.75.41.124:30120');
}
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
