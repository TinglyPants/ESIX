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
        
        if (!global.players.get(interaction.guild.id)){ // If there isnt a player available for this server
            // make one
            global.players.set(interaction.guild.id, createAudioPlayer())
            console.log("Creating a player!")
        }

        if (!global.queues.get(interaction.guild.id)){ // If there isnt a queue available for this server
            // make one
            global.queues.set(interaction.guild.id, [])
            console.log("Creating a queue!")
        }

        // Local copy of player and queue
        const player = global.players.get(interaction.guild.id)
        const queue = global.queues.get(interaction.guild.id)

        connection.subscribe(player)

        // Get results for query

        let yt_info = await play.search(interaction.options.getString('query'), {
            limit: 1
        })
        
        let stream = await play.stream(yt_info[0].url)
        let resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })

        // Add that to the local queue
        queue.push(resource)
        // Update globally stored queue
        global.queues.set(interaction.guild.id, queue)

        // Play it if needed
        if (player._state.status === 'idle'){
            // Get globally stored queue
            let queue = global.queues.get(interaction.guild.id)
            player.play(queue[0])
            // Update globally stored queue, removing first item.
            global.queues.set(interaction.guild.id, queue.slice(1))
        }

        // Add event listener to local player for idle state
        player.on(AudioPlayerStatus.Idle, () => {
            // Get globally stored queue
            let queue = global.queues.get(interaction.guild.id)
            if (queue[0] && queue[0].started === false){
                player.play(queue[0])
                // Update globally stored queue, removing first item.
                global.queues.set(interaction.guild.id, queue.slice(1))
            }
        })

        // Update globally sotred player with event listener
        global.players.set(interaction.guild.id, player)

        await interaction.reply(`Added: "${yt_info[0].title}" by "${yt_info[0].channel}" to the queue.`)
    }
}