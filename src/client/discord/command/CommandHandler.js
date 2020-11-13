const logger = require('../../../config/LoggingConfig')(__filename)
const MessageSourceValidator = require('../validator/MessageSourceValidator')

const COMMAND_ENTRY = 'volantes'
const COMMAND_ARGS_SPLITTER = / +/
const COMMAND_EXECUTED = 'Command executed from [{0}] with content [{1}]'
const ERROR_MESSAGE_SOURCE_NOT_PERMITTED = 'Message is not from the correct source!'

const getMessageArguments = message => message.content.slice(COMMAND_ENTRY.length).trim().split(COMMAND_ARGS_SPLITTER)
const executeCommand = (message, args) => {
	const command = args.shift()
	if (message.client.commands.has(command)) {
		message.client.commands.get(command).execute(message, args)
	}
}

const commandHandler = {
	/**
	 * Handle messages from Discord.
	 * @param {Message} message message from Discord
	 */
	handle(message) {
		if (!MessageSourceValidator.validate(message)) {
			logger.warn(ERROR_MESSAGE_SOURCE_NOT_PERMITTED)
			return
		}
		logger.info(COMMAND_EXECUTED.format(message.author.username, message.content))
		const args = getMessageArguments(message)
		executeCommand(message, args)
	}
}

module.exports = commandHandler
