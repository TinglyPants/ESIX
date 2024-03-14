const { SlashCommandBuilder } = require('discord.js')
const esix_key = process.env.ESIX_KEY
const esix_name = process.env.ESIX_NAME
const axios = require('axios')
const { chooseRandom } = require('../../utils/command/chooseRandom')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('e621_safe')
        .setDescription('Sends a safe e621 image'),
    async execute(interaction) {
        try {
            // Safe rating, random order, limit of 10.
            let tags = [
                'rating:s',
                'order:random',
                'score:>70',
                '-comic',
                '-animated',
            ]
            let response = await axios.get(
                `https://e621.net/posts.json?limit=10&tags=${tags.join('+')}`,
                {
                    headers: {
                        Authorization:
                            'Basic ' + btoa(`${esix_name}:${esix_key}`),
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                    },
                }
            )
            let post = chooseRandom(response.data.posts).id
            await interaction.reply(`https://e621.net/posts/${post}`)
        } catch (e) {
            console.log(e)
            await interaction.reply(
                'Something went wrong. Try again in a few seconds.'
            )
        }
    },
}
