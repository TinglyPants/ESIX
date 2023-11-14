const { Events } = require('discord.js')
const { choose } = require('../utils.js')
const path = require("node:path")
const mouseRealFolder = path.join(__dirname, '../photos/mouse_real')
const mouseComputerFolder = path.join(__dirname, '../photos/mouse_computer')
const fs = require('fs')

const realImages = fs.readdirSync(mouseRealFolder)
const computerImages = fs.readdirSync(mouseComputerFolder)

const coolerJames = "1140794078271897621"
const tinglyPants = "707624825400852491"
const nickNotName = "545350139003273238"
const linuxPenguin = "603970242053537824"
const spaghettiOs = "758763540768620564"

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
        let mouseNumRand = Math.floor(Math.random()*58)
        let recycleNumRand = Math.floor(Math.random()*100)
        // Ryan Mouse
		if (interaction.author.id == spaghettiOs && mouseNumRand == 2 ){
            const file = path.join(mouseRealFolder, choose(realImages))
            await interaction.reply({ content: "**Thank you for joining the ✨[MOUSE]✨ subscription service 💖🐁💖!**\nWe are here to ensure you get your *daily* recommended dose of ✨[MOUSE]✨!\n*Here is your* ✨[MOUSE]✨! 🐁🐁🐁 \n", files: [file]} )
        }
        else if (interaction.author.id == spaghettiOs && mouseNumRand == 1 ){
            const file = path.join(mouseComputerFolder, choose(computerImages))
            await interaction.reply({ content: "**Thank you for joining the ✨[MOUSE]✨ subscription service 💖🖱️💖!**\nWe are here to ensure you get your *daily* recommended dose of ✨[MOUSE]✨!\n*Here is your* ✨[MOUSE]✨! 🖱️🖱️🖱️ \n", files: [file]} )
        }

        // James React
        if (interaction.author.id == coolerJames && recycleNumRand == 1 ){
            await interaction.react("♻️")
        }

        // Ryan mouse
        if (interaction.author.id == spaghettiOs){
            await interaction.react("🐭")
        }

        // Luke child
        if (interaction.author.id == nickNotName){
            //await interaction.react("🧒")
        }
	},
};