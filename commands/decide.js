const { SlashCommandBuilder } = require('discord.js')
const { decision_responses} = require('./responses.json')
const { choose } = require('./utils.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("decide")
    .setDescription('It is time to decide. My decision is final, and not a random number.'),
    async execute(interaction) {
        await interaction.reply(choose(decision_responses))
    }
}