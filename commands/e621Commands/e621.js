const { SlashCommandBuilder } = require('discord.js')
const { e621_responses } = require('../responses.json')
const { chooseRandom } = require('../../utils/command/chooseRandom')
const axios = require('axios')
const esix_key = process.env.ESIX_KEY
const esix_name = process.env.ESIX_NAME

module.exports = {
    data: new SlashCommandBuilder()
        .setName('e621')
        .setDescription('1 in 1,000,000 chance to send a random e621 image'),
    async execute(interaction) {
        try {
            let chanceNum = Math.floor(Math.random() * 1_000_000)
            let tags = [
                'order:random',
                'score:>230',
                '-comic',
                '-animated',
                'anthro',
                '-gore',
                '-scat',
                '-watersports',
                'rating:e',
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
            let postLink = `https://e621.net/posts/${post}`

            if (chanceNum == 621) {
                await interaction.reply(postLink)
            } else if (interaction.user.id == '547459595300503552') {
                await interaction.reply(
                    `OK ${interaction.user.globalName}, I can make an exception just for you then...\n${postLink}`
                )
            } else {
                await interaction.reply(chooseRandom(e621_responses))
            }
        } catch (error) {
            console.log(error)
            await interaction.reply(
                'Something broke. Maybe its a sign to stop.'
            )
        }
    },
}
