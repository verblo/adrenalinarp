const discord = require('discord.js');
const superagent = require('superagent')
const config = require("../botconfig.json")

exports.run = (client, msg, args) => {
  if (msg.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'pgif'})
    .end((err, response) => {
      msg.channel.send({ file: response.body.message });
    });
  } else {
    msg.channel.send("To nie jest kanał NSFW!")
  }
};

    module.exports.help = {
    
      name:`${config.komendagif}`
    
    }