function showUpdatedTable(commands) {
    for (let i = 0; i < commands.length; i++) {
        let name = commands[i].name
        let description = commands[i].description
        console.log(`| ${name} | ${description} |`)
    }
}

module.exports = { showUpdatedTable }
