const { SlashCommandBuilder } = require('discord.js')
const { esix_key, esix_name } = require('../config.json')
const axios = require("axios")

function choose(array){
    let index = Math.floor(Math.random() * array.length)
    return array[index]
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName("e621_safe")
    .setDescription('A safe image from the e621 API.'),
    async execute(interaction) {
        try{
            // Safe rating, random order, limit of 10.
            let response = await axios.get(`https://e621.net/posts.json?limit=10&tags=rating%3As+order%3Arandom`, {headers: { "Authorization": "Basic " + btoa(`${esix_name}:${esix_key}`), 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36' }})
            let post = choose(response.data.posts).id
            await interaction.reply(`https://e621.net/posts/${post}`)
        } catch (e){
            console.log(e)
            await interaction.reply("Something went wrong. Try again in a few seconds.")
        }
    }
}