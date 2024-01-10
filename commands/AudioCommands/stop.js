const { SlashCommandBuilder } = require('discord.js')
const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the current audio player and clears the queue.'),
    async execute(interaction) {
        if (!interaction.member.voice.channel) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0xc31e78)
                        .setTitle('Unable to execute command!')
                        .setDescription(
                            'You must be in a voice channel to use this command.',
                        ),
                ],
            })
            return
        }

        if (!global.players.get(interaction.guild.id)) {
            // If there isnt a player available for this server
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0xc31e78)
                        .setTitle('Unable to execute command!')
                        .setDescription(
                            "No active audio player available. Use '/play' to create one.",
                        ),
                ],
            })
            return
        }

        if (!global.queues.get(interaction.guild.id)) {
            // If there isnt a queue available for this server
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0xc31e78)
                        .setTitle('Unable to execute command!')
                        .setDescription(
                            "No active queue available. Use '/play' to create one.",
                        ),
                ],
            })
            return
        }

        // Local copy of player and queue
        let player = global.players.get(interaction.guild.id)
        let queue = global.queues.get(interaction.guild.id)

        queue = []
        player.stop()
        global.queues.set(interaction.guild.id, queue)
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0xc31e78)
                    .setTitle('Stopped player and cleared queue.'),
            ],
        })
    },
}
