const Discord = require('discord.js')
const ColorResolver = require('../../resolver/ColorResolver')

const MESSAGE_TITLE_VERSION = 'Volantes version'
const MESSAGE_DESCRIPTION = 'Volantis version is `{0}`, profile: `{1}`'

const createResponse = () => new Discord.MessageEmbed()
	.setColor(ColorResolver.GRAY)
	.setTitle(MESSAGE_TITLE_VERSION)
	.setDescription(MESSAGE_DESCRIPTION.format(process.env.RELEASE_VERSION, process.env.APP_PROFILE))

module.exports = {
	/**
	 * Assembles a version embed message for discord.
	 * @param {Message} message message from Discord
	 */
	process(message) {
		const messageEmbed = createResponse()
		message.channel.send(messageEmbed)
	}
}
