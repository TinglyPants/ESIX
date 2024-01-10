require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const { argv } = require('node:process')
const { Client, Events, Collection, Partials } = require('discord.js')
const token = process.env.TOKEN
const { log } = require('./log.js')
const { putCommandsGuild, putCommandsGlobal, showError } = require('./utils.js')
const figlet = require('figlet')
const chalk = require('chalk')

// Welcome user
const titleESIX = figlet.textSync('e621', { font: 'Doh' }).trimEnd()
const welcomeESIX = figlet.textSync('industries', { font: 'Univers' })
console.log(chalk.blue(titleESIX) + '\n' + chalk.yellow(welcomeESIX))

const client = new Client({
    intents: [
        'Guilds',
        'GuildVoiceStates',
        'GuildMessages',
        'GuildMembers',
        'MessageContent',
        'GuildMessageReactions',
        'DirectMessages',
    ],
    partials: [Partials.All],
})

client.commands = new Collection()

const commands = []

function getFiles(folder) {
    const files = fs.readdirSync(folder)

    for (const filename of files) {
        const fullPath = path.join(folder, filename)
        const isDir = fs.statSync(fullPath).isDirectory()
        const isJS = fullPath.endsWith('.js')
        if (isDir) {
            getFiles(fullPath)
        } else if (isJS) {
            const command = require(fullPath)

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command)
                commands.push(command.data.toJSON())
            } else {
                console.log(
                    `[WARNING] The command at: ${fullPath} is missing exports.`,
                )
            }
        }
    }
}

getFiles(path.join(__dirname, 'commands'))

const devMode = process.argv.includes('-dev')

if (!devMode) {
    putCommandsGlobal(commands)
} else {
    console.log(chalk.red('[WARNING] You are in developer mode!'))
    putCommandsGuild(commands)
}

global.players = new Map()
global.queues = new Map()
global.clientRefTemp = client

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand) {
        return
    }

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.error('No command found.')
        return
    }

    try {
        await command.execute(interaction)
        log(interaction.user.globalName, command.data.name)
    } catch (error) {
        showError(error)
        await interaction.reply({
            content: 'There was some kind of issue.',
            ephemeral: true,
        })
    }
})

client.once(Events.ClientReady, (c) => {
    console.log(chalk.green(`Logged in as: ${c.user.tag}`))
    c.user.setStatus('idle')
    c.user.setActivity("with 𝒀𝑶𝑼𝑹 balls. Yeah, that's right!")
})

client.on('error', (err) => {
    showError(err)
})

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'))

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)
    if (event.once) {
        client.once(event.name, (c) => event.execute(c))
    } else {
        client.on(event.name, (c) => event.execute(c))
    }
}

client.login(token)
