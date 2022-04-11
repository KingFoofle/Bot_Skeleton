/**
 * A template for Client Events.
 * Feel free to add this to your workspace snippets file.
 */

// Disable eslint for this file
/* eslint-disable */

/**
 * The code to be run when the event is triggered.
 * @param {import('discord.js').Client} client - The Discord client.
 * @param {...any} args - The arguments passed to the event.
 */
exports.execute = async (client, ...other_arguments) => {
	client.tools.logger.log('This is a template for a Client Event.');
};

// Boolean determining whether the event should run once or not.
exports.once = false;
