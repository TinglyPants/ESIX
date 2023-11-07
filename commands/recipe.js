const { SlashCommandBuilder } = require('discord.js')
const axios = require("axios")
const key = "04e662d46aa7487c9b98762949321982"

module.exports = {
    data: new SlashCommandBuilder()
    .setName("recipe")
    .setDescription('Will send an recipe')
    .addStringOption(option =>
        option
            .setName('query')
            .setDescription('Initial Recipe Query (natural language)')),
    async execute(interaction){
        const query = interaction.options.getString('query')
        console.log(query)
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${key}`)
            console.log(response.data)
        }
        catch {}
    }
}