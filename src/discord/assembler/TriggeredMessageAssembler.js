const Discord = require('discord.js')
const ColorResolver = require('../resolver/ColorResolver')

const MESSAGE_TITLE_DEPLOY = 'Deploy Triggered'
const MESSAGE_DESCRIPTION = 'Hey <@{0}>, your deploy of `{1}` to `{2}` has been triggered.'

module.exports = {
	/**
	 * Assembles a triggered embed message for discord.
	 * @param {string} userId id of the message author
	 * @param {DeployContext} context deploy context
	 * @returns {MessageEmbed} embed message for discord
	 */
	assemble(userId, context) {
		return new Discord.MessageEmbed()
			.setColor(ColorResolver.YELLOW)
			.setTitle(MESSAGE_TITLE_DEPLOY)
			.setDescription(MESSAGE_DESCRIPTION.format(userId, context.application, context.environment))
	}
}
