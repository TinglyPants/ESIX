const { SlashCommandBuilder } = require('discord.js')
const {
    decision_responses_positive,
    decision_responses_negative,
} = require('./responses.json')
const { choose } = require('../utils.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('decide')
        .setDescription('Makes a yes or no decision for you'),
    async execute(interaction) {
        let decide = Math.floor(Math.random() * 2)
        if (decide == 1) {
            await interaction.reply(choose(decision_responses_negative))
        } // 1 == no
        else {
            await interaction.reply(choose(decision_responses_positive))
        } // 0 == yes
    },
}
