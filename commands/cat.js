const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Sends an image of a "cat"'),
    async execute(interaction) {
        try {
            const response = await axios.get(
                'https://api.thecatapi.com/v1/images/search'
            )
            console.log(response.data[0].url)
            await interaction.reply(response.data[0].url)
        } catch (error) {
            console.log(error)
            await interaction.reply('none')
        }
    },
}
