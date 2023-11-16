// Adds commands & users to a json file. Makes a new file every day.
const fs = require('fs')
const path = require('node:path')

function log(userName, commandName){
    const currentDate = new Date()
    // Day
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1 // Months are zero-based, so we add 1
    const day = currentDate.getDate()

    // Time
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const processedTime = `${hours}:${minutes}`

    // File nameing/finding
    const filename = `${day}-${month}-${year}.txt`
    const filePath = path.join(__dirname, "logs", filename)

    // Content Processing
    const content = `${userName} used: ${commandName}, at: ${processedTime}\n`

    fs.appendFile(filePath, content, (err) => {
        if (err) {
            console.log("[WARNING] There was an error logging an action!")
            console.log(err)
        }
    })
}

module.exports = {
    log
}