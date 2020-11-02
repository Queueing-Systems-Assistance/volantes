const logger = require('../../config/LoggingConfig')(__filename)

const COMMAND_ENTRY = 'volantes'
const COMMAND_ARGS_SPLITTER = / +/
const COMMAND_EXECUTED = 'Command executed from [{0}] with content [{1}]'

const isBotMessage = message => message.author.bot
const getMessageArguments = message => message.content.slice(COMMAND_ENTRY.length).trim().split(COMMAND_ARGS_SPLITTER)
const executeCommand = (message, args) => {
	const command = args.shift()
	if (message.client.commands.has(command)) {
		message.client.commands.get(command).execute(message, args)
	}

}

const commandHandler = {
	handle: (message) => {
		if (isBotMessage(message)) {
			return
		}
		logger.info(COMMAND_EXECUTED.format(message.author.username, message.content))
		const args = getMessageArguments(message)
		executeCommand(message, args)
	}
}

module.exports = commandHandler
