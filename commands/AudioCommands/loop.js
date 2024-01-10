const { SlashCommandBuilder } = require('discord.js')
const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Loops the currently playing track.'),
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
    },
}
