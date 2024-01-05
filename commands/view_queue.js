const { EmbedBuilder } = require('@discordjs/builders')
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("view_queue")
    .setDescription("Displays all current songs in the queue."),
    async execute(interaction){
        if (!interaction.member.voice.channel){
            await interaction.reply("You need to be in a voice channel!")
            return
        }

        if (!global.queues.get(interaction.guild.id)){ // If there isnt a queue available for this server
            await interaction.reply("No queue found!")
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