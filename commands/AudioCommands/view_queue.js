const { EmbedBuilder } = require('@discordjs/builders')
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("view_queue")
    .setDescription("Displays all current songs in the queue."),
    async execute(interaction){
        if (!interaction.member.voice.channel){
            await interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(0xc31e78)
            .setTitle("Unable to execute command!")
            .setDescription("You must be in a voice channel to use this command.")]})
            return
        }

        if (!global.queues.get(interaction.guild.id)){ // If there isnt a queue available for this server
            await interaction.reply({ embeds: [new EmbedBuilder()
                .setColor(0xc31e78)
                .setTitle("Unable to execute command!")
                .setDescription("No active queue available. Use '/play' to create one.")]})
            return
        }

        let queue = global.queues.get(interaction.guild.id)

        let baseEmbed = new EmbedBuilder()
            .setColor(0xc31e78)
            .setTitle("Current song queue")

        for (let i = 0; i < queue.length; i++){
            let resource = queue[i]
            baseEmbed.addFields({
                name: `${i+1}. ${resource.songAuthor}`,
                value: resource.songTitle
            })
        }

        await interaction.reply( {embeds: [baseEmbed]} )
    }
}