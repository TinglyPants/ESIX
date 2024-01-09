const { EmbedBuilder } = require('@discordjs/builders')
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear_queue")
    .setDescription("Clears the current queue."),
    async execute(interaction){
        if (!interaction.member.voice.channel){
            await interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(0xc31e78)
            .setTitle("Unable to execute command!")
            .setDescription("You must be in a voice channel to use this command.")]})
            return
        }
        
        if (!global.players.get(interaction.guild.id)){ // If there isnt a player available for this server
            await interaction.reply({ embeds: [new EmbedBuilder()
                .setColor(0xc31e78)
                .setTitle("Unable to execute command!")
                .setDescription("No active audio player available. Use '/play' to create one.")]})
            return
        }

        if (!global.queues.get(interaction.guild.id)){ // If there isnt a queue available for this server
            await interaction.reply({ embeds: [new EmbedBuilder()
                .setColor(0xc31e78)
                .setTitle("Unable to execute command!")
                .setDescription("No active queue available. Use '/play' to create one.")]})
            return
        }

        // Local copy of player and queue
        let player = global.players.get(interaction.guild.id)
        let queue = global.queues.get(interaction.guild.id)

        // Empty the queue
        queue = []
        global.queues.set(interaction.guild.id, queue)
        await interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(0xc31e78)
            .setTitle("Queue cleared!")]})
    }
}