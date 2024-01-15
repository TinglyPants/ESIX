const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')
const key = '04e662d46aa7487c9b98762949321982'
const { chooseRandom } = require('../utils/command/chooseRandom')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('recipe')
        .setDescription('Sends a recipe')
        .addStringOption((option) =>
            option
                .setName('query')
                .setDescription('Initial Recipe Query (natural language)')
        ),
    async execute(interaction) {
        const query = interaction.options.getString('query')
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${key}`
            )
            let choice = chooseRandom(response.data.results)
            const recipe = await axios.get(
                `https://api.spoonacular.com/recipes/${choice.id}/information?apiKey=${key}`
            )
            await interaction.reply(
                `${choice.title}\n${choice.image}\n${recipe.data.sourceUrl}`
            )
        } catch (e) {
            await interaction.reply(`Could not find a recipe for ${query}`)
        }
    },
}
