const Discord = require('discord.js')
const ColorResolver = require('../resolver/ColorResolver')

const MESSAGE_TITLE_DEPLOY = 'Deploy Triggered'
const MESSAGE_DESCRIPTION = 'Hey <@{0}>, your deploy of `{1}` to `{2}` has been triggered.'

function createResponse(userId, context) {
	return new Discord.MessageEmbed()
		.setColor(ColorResolver.YELLOW)
		.setTitle(MESSAGE_TITLE_DEPLOY)
		.setDescription(MESSAGE_DESCRIPTION.format(userId, context.application, context.environment))
}

module.exports = {
	/**
	 * Assembles a triggered embed message for discord.
	 * @param {DeployContext} context deploy context
	 * @param {Message} message message from Discord
	 */
	async process(context, message) {
		const userId = message.author.id
		const messageEmbed = createResponse(userId, context)
		message.channel.send(messageEmbed)
	}
}
