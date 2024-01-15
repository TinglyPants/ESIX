const { SlashCommandBuilder } = require('discord.js')
const { e621_responses } = require('../responses.json')
const { chooseRandom } = require('../../utils/command/chooseRandom')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('e621')
        .setDescription('1 in 1,000,000 chance to send a random e621 image'),
    async execute(interaction) {
        try {
            let postNum = Math.floor(Math.random() * 4_402_916)
            let chanceNum = Math.floor(Math.random() * 10000)

            if (chanceNum == 621) {
                await interaction.reply(
                    `Here you go then...\nhttps://e621.net/posts/${postNum}`
                )
            } else {
                await interaction.reply(choose(e621_responses))
            }
        } catch (error) {
            console.log(error)
            await interaction.reply(
                'Something broke. Maybe its a sign to stop.'
            )
        }
    },
}
