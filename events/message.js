const { Events, AttachmentBuilder } = require('discord.js')
const { choose } = require('../utils.js')
const fs = require('fs')
const https = require('https')
const path = require('path')
const mouseRealFolder = path.join(__dirname, '../photos/mouse_real')
const mouseComputerFolder = path.join(__dirname, '../photos/mouse_computer')
const axios = require('axios')
const esix_key = process.env.ESIX_KEY
const esix_name = process.env.ESIX_NAME
const { EmbedBuilder } = require('@discordjs/builders')

const realImages = fs.readdirSync(mouseRealFolder)
const computerImages = fs.readdirSync(mouseComputerFolder)

const coolerJames = '1140794078271897621'
const tinglyPants = '707624825400852491'
const nickNotName = '545350139003273238'
const linuxPenguin = '603970242053537824'
const spaghettiOs = '758763540768620564'
const a_m_i_n = '547459595300503552'

module.exports = {
    name: Events.MessageCreate,
    async execute(interaction) {
        let mouseNumRand = Math.floor(Math.random() * 100)
        let furryNumRand = Math.floor(Math.random() * 200)
        let recycleNumRand = Math.floor(Math.random() * 1000)
        // Ryan Mouse
        if (interaction.author.id == spaghettiOs && mouseNumRand == 2) {
            let imgName = choose(realImages)
            console.log(imgName)
            const fileName = path.join(mouseRealFolder, imgName)
            let file = new AttachmentBuilder(fileName)
            let message = new EmbedBuilder()
                .setColor(0xc31e78)
                .setTitle(
                    '**Thank you for joining the ✨[MOUSE]✨ subscription service 💖🐁💖!**',
                )
                .setDescription(
                    'We are here to ensure you get your *daily* recommended dose of ✨[MOUSE]✨!\n*Here is your* ✨[MOUSE]✨! 🐁🐁🐁 ',
                )
                .setImage(`attachment://${imgName}`)
            await interaction.reply({ embeds: [message], files: [file] })
            //await interaction.reply({ content: "**Thank you for joining the ✨[MOUSE]✨ subscription service 💖🐁💖!**\nWe are here to ensure you get your *daily* recommended dose of ✨[MOUSE]✨!\n*Here is your* ✨[MOUSE]✨! 🐁🐁🐁 \n", files: [file]} )
        } else if (interaction.author.id == spaghettiOs && mouseNumRand == 1) {
            let imgName = choose(computerImages)
            console.log(imgName)
            const fileName = path.join(mouseComputerFolder, imgName)
            let file = new AttachmentBuilder(fileName)
            let message = new EmbedBuilder()
                .setColor(0xc31e78)
                .setTitle(
                    '**Thank you for joining the ✨[MOUSE]✨ subscription service 💖🖱️💖!**',
                )
                .setDescription(
                    'We are here to ensure you get your *daily* recommended dose of ✨[MOUSE]✨!\n*Here is your* ✨[MOUSE]✨! 🖱️🖱️🖱️ ',
                )
                .setImage(`attachment://${imgName}`)
            await interaction.reply({ embeds: [message], files: [file] })
            //await interaction.reply({ content: "**Thank you for joining the ✨[MOUSE]✨ subscription service 💖🖱️💖!**\nWe are here to ensure you get your *daily* recommended dose of ✨[MOUSE]✨!\n*Here is your* ✨[MOUSE]✨! 🖱️🖱️🖱️ \n", files: [file]} )
        }
        // Amin Subscription
        if (interaction.author.id == a_m_i_n && furryNumRand == 0) {
            // Safe rating, female, limit of 10, random order, score > 50, -comic, images only, solo
            let tags = [
                'rating:s',
                'order:random',
                'score:>70',
                'female',
                '-comic',
                '-animated',
                'solo',
                '-esix',
                'bikini',
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
                },
            )
            let post = choose(response.data.posts)
            let message = new EmbedBuilder()
                .setColor(0xc31e78)
                .setTitle('*Dear Mr. Davies*')
                .setURL(`https://e621.net/posts/${post.id}`)
                .setDescription(
                    "Thank you for joining the 😳[Furry Women Lovers' Society]😳.\n💖 **Please remember to give us a ✨[5 STAR]✨ rating!** 💖\n*🥵 Enjoy!~*",
                )
                .setImage(post.file.url)
            //let message = "*Dear Mr. Davies*,\nThank you for joining the 😳[Furry Women Lovers' Society]😳.\n💖 **Please remember to give us a ✨[5 STAR]✨ rating!** 💖\n*🥵 Enjoy!~*\n\n"
            await interaction.reply({ embeds: [message] })
        }
        // James React
        if (interaction.author.id == coolerJames && recycleNumRand == 1) {
            await interaction.react('♻️')
        }
        // Ryan mouse
        if (interaction.author.id == spaghettiOs) {
            await interaction.react('🐭')
        }

        if (interaction.author.id == tinglyPants) {
            let content = interaction.content
            if (
                content ==
                'test SECRETPASSKEYOOOOOOOOOOOOOOOOOOOOOOOOOOOOTHIS IS SO YOU DONT do IT bY AccIdEnt'
            ) {
                // Secure password
                var fetchID = '1193345322567614564' //Start ID
                let contentIndex = 0
                let channelID = '955845807553282128'
                let clientRef = global.clientRefTemp
                let channel = await clientRef.channels.fetch(channelID)
                for (let i = 0; i < 100; i++) {
                    let numberOfMessages = 100
                    let messages = await channel.messages.fetch({
                        limit: numberOfMessages,
                        before: fetchID,
                    })
                    for (let j = 0; j < numberOfMessages; j++) {
                        let message = messages.at(j)
                        if (message.attachments.size > 0) {
                            message.attachments.each((a) => {
                                let userName = message.author.globalName
                                let contentType = a.contentType

                                console.log(a.name)
                                https.get(a.attachment, (res) => {
                                    try {
                                        let folderName = path.join(
                                            'D:/Videos/HUMOUR',
                                            userName,
                                            contentType,
                                        )
                                        if (!fs.existsSync(folderName)) {
                                            fs.mkdirSync(folderName, {
                                                recursive: true,
                                            })
                                        }
                                        let fileName = path.join(
                                            folderName,
                                            contentIndex.toString() +
                                                '__' +
                                                a.name,
                                        )
                                        let fileStream =
                                            fs.createWriteStream(fileName)
                                        res.pipe(fileStream)
                                    } catch {
                                        let folderName = path.join(
                                            'D:/Videos/HUMOUR/_UNKNOWN',
                                        )
                                        if (!fs.existsSync(folderName)) {
                                            fs.mkdirSync(folderName, {
                                                recursive: true,
                                            })
                                        }
                                        let fileName = path.join(
                                            folderName,
                                            contentIndex.toString() +
                                                '__' +
                                                a.name,
                                        )
                                        let fileStream =
                                            fs.createWriteStream(fileName)
                                        res.pipe(fileStream)
                                    }
                                    contentIndex++
                                })
                            })
                        }
                        fetchID = message.id
                    }
                }
            }
        }
    },
}
