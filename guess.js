const Discord = require("discord.js")
let game = require("../games.json")
let coins = require("../coins.json");

module.exports.run = (bot, message, args) => {
	if(!game[message.author.id]) {
		game[message.author.id] = {
			game: 'None'
		};
	}
  let penGameEmbed = new Discord.RichEmbed()
  .setAuthor("Number Guess", "https://discordapp.com/assets/c64559ce7db12f6dea3404fc44e42b96.svg")
  .setColor("#ecf0f1")
  .addField("How To Play:", "To start a game of guess the number, simply type the prefix and then `guess start`. Once you do this, I will choose a random number between 1 and 1000. If you guess the number within 10 guesses then you lots of xp and coins! (Don't worry, I'll tell you if you are too high, too low, or if you are getting close!)")
  .addField("Helps:", "**Frozen** - not even close.\n**Cold** - within 250 range of the number.\n**Warm** - within 50 range.\n**Boiling** - within 10 range of the number.\n\n`guess start` - begins a game.\n`guess <number>` - lets you guess a number. (Example: `guess 500`)\n`guess end` - ends the game.");
  if(!args[0]) return  message.channel.send(penGameEmbed)
	  
	if (args[0] === "start") {
		if(!game[message.author.id]) {
			game[message.author.id] = {
				game: 'None'
			};
		}
		if (game[message.author.id].game !== 'None') {
			return message.reply(`you cant start a game because you are already playing ${game[message.author.id].game}.`)
		}
		if (game[message.author.id].game === 'None') {
			let numberPick = Math.floor(Math.random() * 999) + 1;
			game[message.author.id] = {
				game: 'Number Guess',
				number: numberPick,
				guesses: 0
			};
			console.log(`${message.author.username} just started a game with number ${game[message.author.id].number}!`)
			let startEmbed = new Discord.RichEmbed()
			.setColor("#2ecc71")
			.setDescription(`${message.author.username}, you have just started a number guessing game! (Type **guess** to see how to play.)`)
			message.channel.send(startEmbed)
			return;
		}
	}
	if (args[0] === "end") {
		if(!game[message.author.id]) {
			game[message.author.id] = {
				game: 'None'
			};
		}
		if (game[message.author.id].game === 'None') {
			return message.reply(`You are not playing any game to end.`)
		}
		if (game[message.author.id].game === 'Number Guess') {
			game[message.author.id] = {
				game: 'None'
			};
			return message.reply(`your game of Number Guess has ended.`)
		} else {
			if (game[message.author.id].game !== 'Number Guess') {
				return message.reply(`You are not playing a ${game[message.author.id].game} not a game of Number Guess!`)
			}
		}
	}
		
	if (game[message.author.id].game === 'Number Guess') {
		if(isNaN(args[0])) return message.reply("please supply a number!");
	
		if(parseInt(args[0]) > 1000) return message.reply("you can't guess higher than 1000!") 
		if(parseInt(args[0]) < 1) return message.reply("you can't guess lower than 1!")

		if(parseInt(args[0]) < game[message.author.id].number) {
			let embedColor = "#2c3e50";
			let temp = "not even close.";
			let thUrl = ""; 
			let tempC = game[message.author.id].number - parseInt(args[0]);
			if (tempC > 250) {
				temp = "Frozen"
				embedColor = "#81ecec"
				thUrl = "https://vignette.wikia.nocookie.net/clubpenguin/images/f/ff/Ice_Block_IG.png/revision/latest?cb=20140814022649"
			}
			if (tempC < 11) {
				temp = "Boiling"
				embedColor = "#c0392b"
				thUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTxhD3iBQj5p0RD3nryLyWd5jbSUbkG4UuCPEY7HsuGzhYbp1K"
			} else if (tempC < 51) {
				temp = "Warm"
				embedColor = "#e74c3c"
				thUrl = "https://thumbs.dreamstime.com/b/sunbather-25449286.jpg"
			} else if (tempC < 251) {
				temp = "Cold"
				embedColor = "#48dbfb"
				thUrl = "https://www.crotonanimalhospital.com/wp-content/uploads/Shivering-dog.jpg?x55456"
			}
			game[message.author.id].guesses = game[message.author.id].guesses + 1
			let lowEmbed = new Discord.RichEmbed()
			.setColor(embedColor)
			.setThumbnail(thUrl)
			.setDescription(`**Guess:** ${parseInt(args[0])}.\n**Status:** too low.\n**Temp:** ${temp}\n**Guesses:** ${game[message.author.id].guesses}`)
			return  message.channel.send(lowEmbed)
		}
		if(parseInt(args[0]) > game[message.author.id].number) {
			let embedColor = "#2c3e50";
			let temp = "not even close.";
			let thUrl = ""; 
			let tempC = parseInt(args[0]) - game[message.author.id].number;
		    if (tempC > 250) {
				temp = "Frozen"
				embedColor = "#81ecec"
				thUrl = "https://vignette.wikia.nocookie.net/clubpenguin/images/f/ff/Ice_Block_IG.png/revision/latest?cb=20140814022649"
			}
			if (tempC < 11) {
				temp = "Boiling"
				embedColor = "#c0392b"
				thUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTxhD3iBQj5p0RD3nryLyWd5jbSUbkG4UuCPEY7HsuGzhYbp1K"
			} else if (tempC < 51) {
				temp = "Warm"
				embedColor = "#e74c3c"
				thUrl = "https://thumbs.dreamstime.com/b/sunbather-25449286.jpg"
			} else if (tempC < 251) {
				temp = "Cold"
				embedColor = "#48dbfb"
				thUrl = "https://www.crotonanimalhospital.com/wp-content/uploads/Shivering-dog.jpg?x55456"
			}
			game[message.author.id].guesses = game[message.author.id].guesses + 1
			let lowEmbed = new Discord.RichEmbed()
			.setColor(embedColor)
			.setThumbnail(thUrl)
			.setDescription(`**Guess:** ${parseInt(args[0])}.\n**Status:** too high.\n**Temp:** ${temp}\n**Guesses:** ${game[message.author.id].guesses}`)
			return  message.channel.send(lowEmbed)
		}
		if (parseInt(args[0]) === game[message.author.id].number) {
			game[message.author.id].guesses = game[message.author.id].guesses + 1
			if(!coins[message.author.id]){
				coins[message.author.id] = {
					coins: 0,
					bank: 200
				};
			}
			let thWin = "https://tse3.mm.bing.net/th?id=OIP.CnkMOIy5F9SeuMnGkVa4zAHaHa&pid=Api";
			let trophie = "Loser's";
			let win = Math.floor(Math.random() * 9) + 1;
			if (game[message.author.id].guesses < 11) {
				thWin = "https://tse1.mm.bing.net/th?id=OIP.GE3dBXWsAwZ1YMkolcOKTwHaKX&pid=Api"
				trophie = "Gold"
				win = win * 10
			} else if (game[message.author.id].guesses < 21) {
				thWin = "https://tse4.mm.bing.net/th?id=OIP.loqSUq-6-5R_k7TkPUDcLAHaLW&pid=Api"
				trophie = "Silver"
				win = win * 5
			} else if (game[message.author.id].guesses < 30) {
				thWin = "https://tse4.mm.bing.net/th?id=OIP.yI8gZ4BdvHYo_mdvthYCkgHaHa&pid=Api"
				trophie = "Bronze"
				win = win * 2
			}
			coins[message.author.id].coins = coins[message.author.id].coins + win
			let lowEmbed = new Discord.RichEmbed()
			.setColor("#f1c40f")
			.setThumbnail(thWin)
			.setDescription(`**__GAME OVER:__**\n**Medal:** ${trophie}\n**Guesses:** ${game[message.author.id].guesses}\n**Number:** ${game[message.author.id].number}\n**Prize:** 💰${win}`)
			message.channel.send(lowEmbed)
			game[message.author.id] = {
				game: 'None'
			};
			return;
		}
	}
	if (game[message.author.id].game !== 'Number Guess') {
		return message.reply("you can't do this. Use `guess` command for more info.")
	}
}

module.exports.help = {
  name: "guess"
}
