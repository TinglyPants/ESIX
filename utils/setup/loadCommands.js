const fs = require('node:fs')
const path = require('node:path')

function getCommandFiles(folder, client, commands) {
    const files = fs.readdirSync(folder)

    for (const filename of files) {
        const fullPath = path.join(folder, filename)
        const isDir = fs.statSync(fullPath).isDirectory()
        const isJS = fullPath.endsWith('.js')
        // Allows files to be stored in folders, any depth.
        if (isDir) {
            getCommandFiles(fullPath, client, commands)
        } else if (isJS) {
            const command = require(fullPath)

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command)
                commands.push(command.data.toJSON())
            } else {
                console.log(
                    `[WARNING] The command at: ${fullPath} is missing exports.`
                )
            }
        }
    }
    return commands
}

module.exports = { getCommandFiles }
