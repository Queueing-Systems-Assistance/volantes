const Discord = require('discord.js')
const logger = require('./LoggingConfig')(__filename)
const MessageCommandHandler = require('../client/discord/command/CommandHandler')

const FAILED_TO_LOGIN_ERROR = 'Error occurred while logging in'
const EVENT_MESSAGE_ARRIVED = 'message'
const COMMANDS_DIRECTORY_RELATIVE_PATH = '../client/discord/command/{0}'

const DISCORD_COMMANDS = [
	'CommandHandler',
	'DeployCommand'
]

const configureCommands = client => {
	client.commands = new Discord.Collection()
	DISCORD_COMMANDS.forEach(file => {
		const command = require(COMMANDS_DIRECTORY_RELATIVE_PATH.format(file))
		client.commands.set(command.name, command)
	})
}

const configureAuthentication = client => {
	client.login(process.env.DISCORD_TOKEN).catch((error) => logger.error(FAILED_TO_LOGIN_ERROR, error))
}

const configureEvents = client => {
	client.on(EVENT_MESSAGE_ARRIVED, (message) => MessageCommandHandler.handle(message))
}

module.exports = {
	/**
	 * Discord configuration.
	 */
	setUp() {
		const client = new Discord.Client()
		configureCommands(client)
		configureAuthentication(client)
		configureEvents(client)
	}
}
