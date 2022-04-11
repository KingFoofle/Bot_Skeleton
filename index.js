const { Client, Intents, Collection } = require('discord.js');

const client = new Client({ intents: [
	// TODO: Add your intents here
	Intents.FLAGS.GUILDS,
] });

// Load the environment variables and attach them to the client
require('dotenv').config();
client.env = process.env;

// Define an object to hold the client tools
client.tools = {};

/**
 * Loads all events from the events folder and attaches them to the client.
 */
const load_events = async () => {
	const { logger } = client.tools;

	// Grab the name of all events under the Events/Client/ folder
	const events = require('fs').readdirSync('./Events/Client').filter(file => file.endsWith('.js'));

	// Go over each event and assign the execute function to the event listener
	for (const event of events) {
		logger.load(`Loading Event: ${event}`);

		try {
			const event_file = require(`./Events/Client/${event}`);
			const event_name = event.split('.')[0];

			// Bind client to the event file execute function
			// This allows the event file to have access to the client
			if (event_file.once) { client.once(event_name, event_file.execute.bind(null, client)); }
			else { client.on(event_name, event_file.execute.bind(null, client)); }
		}

		catch (error) {
			logger.error(`Error loading Event: ${event}`);
			logger.error(error);
		}
	}
};

/**
 * Loads all commands from the commands folder and attaches them to the client.
 */
const load_commands = async () => {
	/**
   * ! NOTE: This assumes that all commands are under the Commands/ folder
   * !       and that the command name is the same as the file name.
   * !       If this is not the case, you will need to change this.
   */
	const { logger } = client.tools;
	client.commands = new Collection();

	// Grab the name of all commands under the Commands/ folder
	const commands = require('fs').readdirSync('./Commands').filter(file => file.endsWith('.js'));

	// Go over each command and assign the execute function to the command listener
	for (const command of commands) {
		logger.load(`Loading Command: ${command}`);

		try {
			const command_file = require(`./Commands/${command}`);
			const command_name = command.split('.')[0];

			// Bind client to the command file execute function
			// This allows the command file to have access to the client
			client.commands.set(command_name, command_file.execute.bind(null, client));
		}

		catch (error) {
			logger.error(`Error loading Command: ${command}`);
			logger.error(error);
		}
	}
};


async function main() {
	// Require and attach the logger to the client
	client.tools.logger = require('./Tools/logger');

	// Load all events and commands
	await Promise.all([
		load_events(),
		load_commands(),
	]);

	// Login to Discord with your app's token
	// This will trigger the ready event
	await client.login(client.env.DISCORD_TOKEN);
}

// Start the bot
main();