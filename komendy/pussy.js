const discord = require('discord.js');
const config = require("../botconfig.json");
const superagent = require('superagent')

exports.run = (client, msg, args) => {
  if (msg.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'pussy'})
    .end((err, response) => {
      msg.channel.send({ file: response.body.message });
    });
  } else {
    msg.channel.send("To nie jest kanał NSFW!")
  }
};


    module.exports.help = {
    
      name:`${config.komendapussy}`
    
    }