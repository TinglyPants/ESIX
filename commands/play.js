const { SlashCommandBuilder } = require('discord.js')
const { joinVoiceChannel, StreamType } = require('@discordjs/voice')
const { createAudioPlayer, createAudioResource, AudioPlayerStatus} = require('@discordjs/voice')
const { QueryType, serialize } = require('discord-player')
const ytsr = require('ytsr')
const { VoiceConnectionStatus, entersState } = require('@discordjs/voice')
const play = require('play-dl')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription('Plays music???')
    .addStringOption(option =>
        option
            .setName('query')
            .setDescription('query for youtube search.')
            .setRequired(true)),
    async execute(interaction){
        if (!interaction.member.voice.channel){
            await interaction.reply("You need to be in a voice channel!")
            return
        }
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        })

        connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
            try {
                await Promise.race([
                    entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
                // Seems to be reconnecting to a new channel - ignore disconnect
            } catch (error) {
                // Seems to be a real disconnect which SHOULDN'T be recovered from
                connection.destroy();
            }
        });

        const player = interaction.player
        connection.subscribe(player)

        let yt_info = await play.search(interaction.options.getString('query'), {
            limit: 1
        })
        
        let stream = await play.stream(yt_info[0].url)
        let resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })
        
        global.queue.push(resource)

        if (player._state.status === 'idle'){
            player.play(global.queue[0])
            global.queue = global.queue.slice(1)
        }

        await interaction.reply(`Added: "${yt_info[0].title}" by "${yt_info[0].channel}" to the queue.`)
    }
}