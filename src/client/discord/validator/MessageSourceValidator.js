const logger = require('../../../config/LoggingConfig')(__filename)

const isBotMessage = message => message.author.bot
const isDirectMessage = message => message.channel.type === 'dm'
const isMessageFromCorrectChannel = message => message.channel.id === process.env.DISCORD_CHANNEL_ID
const isMessageFromCorrectServer = message => message.channel.guild.id === process.env.DISCORD_SERVER_ID
const isDevelopmentProfile = () => process.env.APP_PROFILE === 'development'

const ERROR_MESSAGE_SOURCE_NOT_PERMITTED = 'Message is not from the correct source! [DM={0}] [CID={1}] [SID={2}]'
module.exports = {
	/**
	 * Validates message source. Only QSA server and #qsa-deploy channel allowed.
	 * @param {Message} message message from Discord
	 * @returns {boolean} true if the message is from valid source, false otherwise
	 */
	validate(message) {
		if (isBotMessage(message)) {
			return false
		}
		let isValid = true
		const isDM = isDirectMessage(message)
		const isCorrectChannel = isMessageFromCorrectChannel(message)
		const isCorrectServer = isMessageFromCorrectServer(message)
		if (isDevelopmentProfile()) {
			isValid = isDM
		} else {
			isValid = !isDM && isCorrectChannel && isCorrectServer
		}
		if (!isValid) {
			logger.warn(ERROR_MESSAGE_SOURCE_NOT_PERMITTED.format(isDM, isCorrectChannel, isCorrectServer))
		}
		return isValid
	}
}
