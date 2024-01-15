const chalk = require('chalk')

module.exports = {
    name: 'ready',
    async execute(c) {
        console.log(chalk.green(`Logged in as: ${c.user.tag}`))
        c.user.setStatus('idle')
        c.user.setActivity("with 𝒀𝑶𝑼𝑹 balls. Yeah, that's right!")
    },
}
