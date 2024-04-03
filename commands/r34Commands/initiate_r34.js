const { SlashCommandBuilder } = require('discord.js')
const { r34_responses } = require('../responses.json')
const { chooseRandom } = require('../../utils/command/chooseRandom')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('r34_start')
        .setDescription('Starts the Rule 34 messages...'),
    async execute(interaction) {
        try {
            await interaction.reply(chooseRandom(r34_responses))
        } catch {
            await interaction.reply(
                'Sorry, something went wrong. Try again later?'
            )
        }
    },
}
