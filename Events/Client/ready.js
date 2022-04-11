/**
  * Runs when the client is ready.
  * @param {import('discord.js').Client} client - The Discord client.
  */
exports.execute = async (client) => {
	const { logger } = client.tools;
	logger.success('Successfully Logged In');
	logger.log('Logged in as: ' + client.user.tag);
};

// Boolean determining whether the event should run once or not.
exports.once = false;