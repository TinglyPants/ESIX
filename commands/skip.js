const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription('Skips the current song.'),
    async execute(interaction){
        if (global.queue[0]){
            console.log("Something is in the queue! playing it now.")
            interaction.player.play(global.queue[0])
            global.queue = global.queue.slice(1)
        }
        await interaction.reply("Skipped!")
    }
}