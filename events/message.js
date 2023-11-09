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
        let waifuNumRand = Math.floor(Math.random()*10)
        let recycleNumRand = Math.floor(Math.random()*100)
        // James Waifu
		if (interaction.author.id == coolerJames && waifuNumRand == 1 ){
            const response = await axios.get('https://nekos.life/api/v2/img/neko')
            const URL = response.data.url

            await interaction.reply("**Thank you for joining the ✨[WAIFU]✨ subscription service 💖😻💖!**\nWe are here to ensure you get your *daily* recommended dose of ✨[WAIFU]✨!\n*Here is your* ✨[WAIFU]✨! 😘😘😘 \n" + URL)
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