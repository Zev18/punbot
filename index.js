const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'Njk0MjY5MzY3MTUxNDkzMTMw.XoJKxw.rL0CFRowlbIQ0XZWlpZ85NNiUTA';

const PREFIX = "!";

const fs = require("fs");
bot.stats = require ("./stats.json");

var gold = "null";
var goldNum = 0;

var silver = "null";
var silverNum = 0;

var bronze = "null";
var bronzeNum = 0;

bot.on('ready', () => {
    console.log('This PunBot is just aBOT ready to keep track of your puns!')
})

bot.on('message', message=> {

    let args = message.content.substring(PREFIX.length).split(' ');

    switch(args[0]) {
        case 'help':
            message.channel.send(
                "Here's what I do, <@" + message.author.id + ">:\n !help = displays all commands\n !badumtiss = add 1 to your pun tally\n !list puns = tell me how many puns I've tallied\n I don't really do much else lol"
            );
            break;

        case 'badumtiss':
            if (!bot.stats[message.author.username]) {
                bot.stats[message.author.username] = {
                    "puns": 1
                }
                fs.writeFile("./stats.json", JSON.stringify (bot.stats, null, 4), err => {
                    if (err) throw err;

                    message.channel.send("Good one, <@" + message.author.id + ">! Your pun has been tallied!");
                });
            } else {
                bot.stats[message.author.username].puns = bot.stats[message.author.username].puns + 1;
                fs.writeFile("./stats.json", JSON.stringify (bot.stats, null, 4), err => {
                    if (err) throw err;

                    message.channel.send("Good one, <@" + message.author.id + ">! Your pun has been tallied!");
                });
            }
            break;

        case 'list':
            if (args[1] === "puns") {
                message.channel.send("You have made " + bot.stats[message.author.username].puns + " puns so far!");

                var punCard = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setAuthor('Official PunCard™️')
                    .setTitle(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .addField('Total puns made', bot.stats[message.author.username].puns)

                message.channel.send(punCard);
            }
            break;
    }
})

bot.login(token);