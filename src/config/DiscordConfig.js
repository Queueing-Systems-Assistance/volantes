const Discord = require('discord.js')
const logger = require('./LoggingConfig')(__filename)
const fs = require('fs')
const MessageCommandHandler = require('../discord/command/CommandHandler')

const FAILED_TO_LOGIN_ERROR = 'Error occurred while logging in'
const EVENT_MESSAGE_ARRIVED = 'message'
const COMMANDS_DIRECTORY_ABSOLUTE_PATH = './src/discord/command'
const COMMANDS_DIRECTORY_RELATIVE_PATH = '../discord/command/{0}'

const configureCommands = client => {
	client.commands = new Discord.Collection()
	fs.readdirSync(COMMANDS_DIRECTORY_ABSOLUTE_PATH).forEach(file => {
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
	setUp: () => {
		const client = new Discord.Client()
		configureCommands(client)
		configureAuthentication(client)
		configureEvents(client)
	}
}
