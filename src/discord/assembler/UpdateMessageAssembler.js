const Discord = require('discord.js')
const ColorResolver = require('../resolver/ColorResolver')

const MESSAGE_TITLE_DEPLOY = 'Deploy Update'
const MESSAGE_DESCRIPTION = 'The deploy of `{0}` to `{1}` is running :rocket:'

module.exports = {
	/**
	 * Assembles an update embed message for discord.
	 * @param {DeployContext} context deploy context
	 * @returns {MessageEmbed} embed message for discord
	 */
	assemble(context) {
		return new Discord.MessageEmbed()
			.setColor(ColorResolver.YELLOW)
			.setTitle(MESSAGE_TITLE_DEPLOY)
			// TODO: These fields will be replaced within QSA-49, QSA-50
			.addField('Ticket', 'Add MM1 validator', true)
			.addField('Version', '1.0.32', true)
			.addField('ID', 'QSA-23', true)
			.setDescription(MESSAGE_DESCRIPTION.format(context.application, context.environment))
	}
}
