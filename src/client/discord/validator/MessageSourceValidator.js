const isBotMessage = message => message.author.bot
const isDirectMessage = message => message.channel.type === 'dm'
const isMessageFromCorrectChannel = message => message.channel.id === process.env.DISCORD_CHANNEL_ID
const isMessageFromCorrectServer = message => message.channel.guild.id === process.env.DISCORD_SERVER_ID
const isDevelopmentProfile = () => process.env.APP_PROFILE === 'development'

module.exports = {
	/**
	 * Validates message source. Only QSA server and #qsa-deploy channel allowed.
	 * @param {Message} message message from Discord
	 * @returns {boolean} true if the message is from valid source, false otherwise
	 */
	validate(message) {
		if (isDevelopmentProfile()) {
			return !isBotMessage(message) && isDirectMessage(message)
		}
		return !isBotMessage(message) &&
			!isDirectMessage(message) &&
			isMessageFromCorrectChannel(message) &&
			isMessageFromCorrectServer(message)
	}
}
