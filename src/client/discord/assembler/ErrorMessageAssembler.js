const Discord = require('discord.js')
const ColorResolver = require('../resolver/ColorResolver')

const MESSAGE_TITLE_DEPLOY = 'Deploy Failed'
const MESSAGE_DESCRIPTION = `
A \`{0}\` deployment to \`{1}\` has failed. View logs for more clues.

**Error message**

{2}`

function createResponse(context, errorMessage) {
	return new Discord.MessageEmbed()
		.setColor(ColorResolver.RED)
		.setTitle(MESSAGE_TITLE_DEPLOY)
		.setDescription(MESSAGE_DESCRIPTION.format(context.application, context.environment, errorMessage))
}

module.exports = {
	/**
	 * Assembles an error embed message for discord.
	 * @param {DeployContext} context deploy context
	 * @param {Message} message message from Discord
	 * @param {string} errorMessage error message during the process of the request
	 */
	async process(context, message, errorMessage) {
		const messageEmbed = createResponse(context, errorMessage)
		message.channel.send(messageEmbed)
	}
}
