const fs = require("node:fs")
const path = require("node:path")
const { Client, Events, Collection, InteractionCollector, REST, Routes, Partials, Intents} = require("discord.js")
const { createAudioPlayer, AudioPlayerStatus } = require('@discordjs/voice')
const { token, clientId} = require("./config.json")
const { log } = require("./log.js")
const { express_init } = require('./express_handler.js')

const client = new Client({ 
    intents: ["Guilds", "GuildVoiceStates", "GuildMessages", "GuildMembers", "MessageContent", "GuildMessageReactions", "DirectMessages"], 
    partials: [Partials.All]})

client.commands = new Collection()

const commands = []
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command)
        commands.push(command.data.toJSON())
    } else {
        console.log(`[WARNING] The command at: ${filePath} is missing exports.`)
    }
}

const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        )

        // Test Guild Commands
        // await rest.put(
		// 	Routes.applicationGuildCommands(clientId, '832357497524060170'),
		// 	{ body: commands },
		// )

        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error)
    }
})();

// CMNDS

express_init()

global.players = new Map()
global.queues = new Map()


client.on(Events.InteractionCreate, async interaction =>{
    if (!interaction.isChatInputCommand){ return }

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.error("No command found.")
        return
    }

    try{
        await command.execute(interaction)
        log(interaction.user.globalName, command.data.name)
    }
    catch (error) {
        console.log(error)
        await interaction.reply({ content: "There was some kind of issue." , ephemeral: true})
    }
})

client.once(Events.ClientReady, c =>{
    console.log(`Logged in as: ${c.user.tag}`)
    c.user.setStatus("idle")
    //c.user.setUsername("ESIX >w<")
    c.user.setActivity("with 𝒀𝑶𝑼𝑹 balls. Yeah, that's right!")
})

client.on(Events.MessageCreate, c => {
    if (!c.guildId){
        //DM
        console.log(`User: ${c.author.username} sent: ${c.content}`)
        if (c.author.username == "tinglypants"){
            try {
                let content = c.content.split(";")
                let userToDM = content[0]
                let contentToSend = content[1]
                client.users.send(userToDM, contentToSend);
            } catch {}
        }
    }
})

client.on("error", ()=>{
    console.log("There was some kind of error.")
})

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (c) => event.execute(c));
	} else {
		client.on(event.name, (c) => event.execute(c));
	}
}

client.login(token)