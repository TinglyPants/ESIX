const chalk = require('chalk')
const clientID = process.env.CLIENT_ID
const token = process.env.TOKEN
const { Routes, REST } = require('discord.js')
const rest = new REST().setToken(token)
const developmentServerID = '1131949379813638216'

async function putCommandsGlobal(commands) {
    console.log(
        chalk.green(
            `Started refreshing ${commands.length} application (/) commands.`
        )
    )
    await rest.put(Routes.applicationCommands(clientID), { body: commands })
    console.log(chalk.bold(chalk.greenBright('Success!')))
}

module.exports = { putCommandsGlobal }
