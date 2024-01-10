const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Generates a random number')
        .addIntegerOption((option) =>
            option
                .setName('count')
                .setRequired(true)
                .setDescription('Number of sides')
        ),
    async execute(interaction) {
        const count = interaction.options.getInteger('count')
        num = Math.floor(Math.random() * count) + 1
        await interaction.reply(`Roll: ${num}`)
    },
}
