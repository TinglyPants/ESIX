const { SlashCommandBuilder } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')
const {
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
} = require('@discordjs/voice')
const play = require('play-dl')
const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays music???')

        .addSubcommand((subcommand) =>
            subcommand
                .setName('url')
                .setDescription('Use a YouTube URL')
                .addStringOption((option) =>
                    option
                        .setName('url')
                        .setDescription('URL for YouTube.')
                        .setRequired(true),
                ),
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName('query')
                .setDescription('Use a YouTube search query')
                .addStringOption((option) =>
                    option
                        .setName('query')
                        .setDescription('query for YouTube search.')
                        .setRequired(true),
                ),
        ),

    async execute(interaction) {
        if (!interaction.member.voice.channel) {
            await interaction.reply('You need to be in a voice channel!')
            return
        }
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        })

        if (!global.queues.get(interaction.guild.id)) {
            // If there isnt a queue available for this server
            // make one
            global.queues.set(interaction.guild.id, [])
            console.log('Creating a queue!')
        }

        if (!global.players.get(interaction.guild.id)) {
            // If there isnt a player available for this server
            // make one
            global.players.set(interaction.guild.id, createAudioPlayer())
            console.log('Creating a player!')
            let player = global.players.get(interaction.guild.id)
            // Add event listener to local player for idle state
            player.on(AudioPlayerStatus.Idle, async () => {
                // Get globally stored queue
                let queue = global.queues.get(interaction.guild.id)
                if (queue[0]) {
                    player.play(queue[0])
                    try {
                        await interaction.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(0xc31e78)
                                    .setTitle('Now playing')
                                    .addFields({
                                        name: queue[0].songAuthor,
                                        value: queue[0].songTitle,
                                    })
                                    .setImage(queue[0].songThumbnail),
                            ],
                        })
                    } catch {
                        console.log(
                            "Unable to send message for some reason. Maybe its that 'interaction expires after 15 minutes' thing??",
                        )
                    }
                    // Update globally stored queue, removing first item.
                    global.queues.set(interaction.guild.id, queue.slice(1))
                }
            })
            // Update globally stored player with event listener
            global.players.set(interaction.guild.id, player)
        }

        let responseEmbed = new EmbedBuilder().setColor(0xc31e78)

        // Local copy of player and queue
        const player = global.players.get(interaction.guild.id)
        const queue = global.queues.get(interaction.guild.id)

        connection.subscribe(player)

        // Get results for query
        var stream
        var yt_info

        if (interaction.options.getSubcommand() === 'query') {
            yt_info = await play.search(
                interaction.options.getString('query'),
                {
                    limit: 1,
                },
            )
            yt_info = yt_info[0]
            stream = await play.stream(yt_info.url)
        } else if (interaction.options.getSubcommand() === 'url') {
            stream = await play.stream(interaction.options.getString('url'))
            yt_info = await play.video_info(
                interaction.options.getString('url'),
            )
            yt_info = yt_info.video_details
        }

        let resource = createAudioResource(stream.stream, {
            inputType: stream.type,
        })

        // Adding extra info.
        resource.songTitle = yt_info.title
        resource.songAuthor = yt_info.channel.name
        resource.songThumbnail = yt_info.thumbnails[0].url

        // Add that to the local queue
        queue.push(resource)
        // Update globally stored queue
        global.queues.set(interaction.guild.id, queue)

        // Play it if needed
        if (player._state.status === 'idle') {
            // Get globally stored queue
            let queue = global.queues.get(interaction.guild.id)
            player.play(queue[0])
            responseEmbed
                .setTitle('Now playing')
                .addFields({
                    name: resource.songAuthor,
                    value: resource.songTitle,
                })
                .setImage(resource.songThumbnail)
            // Update globally stored queue, removing first item.
            global.queues.set(interaction.guild.id, queue.slice(1))
        } else {
            responseEmbed
                .setTitle('Added to queue')
                .addFields({
                    name: resource.songAuthor,
                    value: resource.songTitle,
                })
                .setImage(resource.songThumbnail)
        }

        await interaction.reply({ embeds: [responseEmbed] })
    },
}
