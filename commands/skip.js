const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription('Skips the current song.'),
    async execute(interaction){
        if (!interaction.member.voice.channel){
            await interaction.reply("You need to be in a voice channel!")
            return
        }
        
        if (!global.players.get(interaction.guild.id)){ // If there isnt a player available for this server
            await interaction.reply("No active audio player available. Use '/play' to create one.")
            return
        }

        if (!global.queues.get(interaction.guild.id)){ // If there isnt a queue available for this server
            await interaction.reply("No active queue available. Use '/play' to create one.")
            return
        }

        // Local copy of player and queue
        let player = global.players.get(interaction.guild.id)
        let queue = global.queues.get(interaction.guild.id)

        if (queue[0]){
            console.log("Something is in the queue! playing it now.")
            player.play(queue[0])
            // Update globally stored queue
            global.queues.set(interaction.guild.id, queue.slice(1))
        }

        await interaction.reply("Skipped!")

    }
}