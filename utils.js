const chalk = require('chalk')
const clientID = process.env.CLIENT_ID
const token = process.env.TOKEN
const { Routes, REST } = require('discord.js')
const rest = new REST().setToken(token)
const developmentServerID = '1131949379813638216'

function choose(array) {
    let index = Math.floor(Math.random() * array.length)
    return array[index]
}

function loadCommands() {}

function showError(err) {
    console.log(
        chalk.bgRedBright(
            '---------------------------------------------------------------',
        ),
    )
    console.dir(err)
    console.log(
        chalk.bgRedBright(
            '---------------------------------------------------------------',
        ),
    )
}

async function putCommandsGuild(commands) {
    console.log(
        chalk.green(
            `Started refreshing ${commands.length} application (/) guild commands.`,
        ),
    )
    await rest.put(
        Routes.applicationGuildCommands(clientID, developmentServerID),
        { body: commands },
    )
    console.log(chalk.bold(chalk.greenBright('Success!')))
}

async function putCommandsGlobal(commands) {
    console.log(
        chalk.green(
            `Started refreshing ${commands.length} application (/) commands.`,
        ),
    )
    await rest.put(Routes.applicationCommands(clientID), { body: commands })
    console.log(chalk.bold(chalk.greenBright('Success!')))
}

module.exports = {
    choose,
    putCommandsGlobal,
    putCommandsGuild,
    loadCommands,
    showError,
}
