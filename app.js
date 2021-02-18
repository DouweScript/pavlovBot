//API's die nodig zijn om de bot te laten communiceren met discord
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';
const fs = require('fs');
client.commands = new Discord.Collection();

//Laat in terminal weten dat de bot online is
client.once('ready', () => {
    console.log("Bot is online!");
});

//reageert op berichten die beginnen met de prefix
client.on('message', async message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    var vc = message.member.voice.channel;
    if(!message.content.startsWith(prefix) || message.author.bot){
      return;
    }

    if (command === "pavlov"){
        if(!vc){
          return message.reply("you aren't in a voice channel");
        }
        playAirhorn();
    }

    if(command === "leave"){
        vc.leave();
    }

    if(command === "join"){
        vc.join();
    }

    function playAirhorn(){
        vc.join().then(connection => {
            const dispatcher = connection.play('https://www.myinstants.com/media/sounds/mlg-airhorn.mp3', {volume: 0.25});
        });
        var x = Math.floor(Math.random() * 600000);
        console.log(x);
        setTimeout(playAirhorn, x);
    }
});  
