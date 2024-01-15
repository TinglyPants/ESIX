const chalk = require('chalk')

function showError(err) {
    console.log(
        chalk.bgRedBright(
            '---------------------------------------------------------------'
        )
    )
    console.dir(err)
    console.log(
        chalk.bgRedBright(
            '---------------------------------------------------------------'
        )
    )
}

module.exports = { showError }
