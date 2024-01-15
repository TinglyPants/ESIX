require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const { Client, Events, Collection, Partials } = require('discord.js')
const token = process.env.TOKEN
const figlet = require('figlet')
const chalk = require('chalk')
const { getCommandFiles } = require('./utils/setup/loadCommands')
const { putCommandsGlobal } = require('./utils/setup/putCommandsGlobal')
const { putCommandsGuild } = require('./utils/setup/putCommandsGuild')
const { showError } = require('./utils/maintenance/showError')
const { logCommand } = require('./utils/maintenance/logCommand')
const { showUpdatedTable } = require('./utils/maintenance/updateTable')

// Welcome user
const titleMessageESIX = figlet.textSync('e621', { font: 'Doh' }).trimEnd()
const welcomeMessageESIX = figlet.textSync('industries', { font: 'Univers' })
console.log(
    chalk.blue(titleMessageESIX) + '\n' + chalk.yellow(welcomeMessageESIX)
)

const updateTableMode = process.argv.includes('-updateTable')

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
const commands = getCommandFiles(path.join(__dirname, 'commands'), client, []) // Empty array is made for recursive function.

// Log commands to console for updating readme.
if (updateTableMode) {
    showUpdatedTable(commands)
    return
}

const devMode = process.argv.includes('-dev')

;(async () => {
    if (!devMode) {
        await putCommandsGlobal(commands)
    } else {
        console.log(chalk.red('[WARNING] You are in developer mode!'))
        await putCommandsGuild(commands)
    }
})()

global.players = new Map()
global.queues = new Map()

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
        logCommand(interaction.user.globalName, command.data.name)
    } catch (error) {
        showError(error)
        await interaction.reply({
            content: 'There was some kind of issue.',
            ephemeral: true,
        })
    }
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
