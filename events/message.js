const { Events } = require('discord.js');
const axios = require("axios")

const coolerJames = "1140794078271897621"
const tinglyPants = "707624825400852491"
const nickNotName = "545350139003273238"
const linuxPenguin = "603970242053537824"
const spaghettiOs = "758763540768620564"

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
        if (!interaction) {
            return -1
        }
		if (interaction.author.id == coolerJames && Math.floor(Math.random()*30) == 1 ){
            const response = await axios.get('https://nekos.life/api/v2/img/neko')
            const URL = response.data.url

            await interaction.reply("**Thank you for joining the ✨[WAIFU]✨ subscription service 💖😻💖!**\nWe are here to ensure you get your *daily* recommended dose of ✨[WAIFU]✨!\n*Here is your* ✨[WAIFU]✨! 😘😘😘 \n" + URL)
        }
        if (interaction.author.id == spaghettiOs){
            await interaction.react("🐭")
        }
        if (interaction.author.id == nickNotName){
            //await interaction.react("🧒")
        }
	},
};