const fs = require("node:fs")
const path = require("node:path")
const { Client, Events, Collection, InteractionCollector, REST, Routes ,Partials} = require("discord.js")
const { token, clientId} = require("./config.json")

const client = new Client({ intents: ["Guilds", "GuildVoiceStates", "GuildMessages", "GuildMembers", "MessageContent", "MessageContent", "GuildMessageReactions"], partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildMember] })

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
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();

// CMNDS

client.on(Events.InteractionCreate, async interaction =>{
    if (!interaction.isChatInputCommand){ return }

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.error("No command found.")
        return
    }

    try{
        await command.execute(interaction)
    }
    catch (error) {
        console.log(error)
        await interaction.reply({ content: "There was some kind of issue." , ephemeral: true})
    }
})

client.once(Events.ClientReady, c =>{
    console.log(`Logged in as: ${c.user.tag}`)
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