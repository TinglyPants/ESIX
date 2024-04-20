const { SlashCommandBuilder } = require('discord.js')
const { e621_responses } = require('../responses.json')
const { chooseRandom } = require('../../utils/command/chooseRandom')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('e621')
        .setDescription('1 in 1,000,000 chance to send a random e621 image'),
    async execute(interaction) {
        try {
            let postNum = Math.floor(Math.random() * 4_732_269)
            let chanceNum = Math.floor(Math.random() * 100000)

            if (chanceNum == 621) {
                await interaction.reply(
                    `Here you go then...\nhttps://e621.net/posts/${postNum}`
                )
            } else if (interaction.user.id == '547459595300503552') {
                await interaction.reply(
                    `OK ${interaction.user.globalName}, I can make an exception just for you then...\nhttps://e621.net/posts/${postNum}`
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
