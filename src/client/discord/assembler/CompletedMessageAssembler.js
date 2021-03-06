const Discord = require('discord.js')
const ColorResolver = require('../resolver/ColorResolver')
const VolantesVersionResolver = require('../resolver/VolantesVersionResolver')

const MESSAGE_TITLE_DEPLOY = 'Deploy Completed Successfully'
const MESSAGE_DESCRIPTION = 'A `{0}` deployment to `{1}` has been completed'

const createResponse = context => new Discord.MessageEmbed()
	.setColor(ColorResolver.GREEN)
	.setTitle(MESSAGE_TITLE_DEPLOY)
	.setDescription(MESSAGE_DESCRIPTION.format(context.application, context.environment))
	.setFooter(VolantesVersionResolver.resolve())

module.exports = {
	/**
	 * Assembles a completed embed message for discord.
	 * @param {DeployContext} context deploy context
	 * @param {Message} message message from Discord
	 */
	process(context, message) {
		const messageEmbed = createResponse(context)
		message.channel.send(messageEmbed)
	}
}
