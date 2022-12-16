const TOKEN = "MTA0NTM0MTU3NTQ5ODE3ODYwMA.GyfN3V.-Vg_o8z6y_5Yh87J2jWs2jVYiOUPa2Eo96dubs"
const CLIENT_ID = "1045341575498178600"

const {Client,  Collection, Events, GatewayIntentBits} = require('discord.js');
const path = require("path");
const fs = require("fs");

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
    console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(TOKEN);