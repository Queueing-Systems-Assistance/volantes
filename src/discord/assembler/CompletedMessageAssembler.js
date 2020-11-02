const Discord = require('discord.js')
const ColorResolver = require('../resolver/ColorResolver')

const MESSAGE_TITLE_DEPLOY = 'Deploy Completed Successfully'
const MESSAGE_DESCRIPTION = 'A `{0}` deployment to `{1}` has been completed'

module.exports = {
	assemble(context) {
		return new Discord.MessageEmbed()
			.setColor(ColorResolver.GREEN)
			.setTitle(MESSAGE_TITLE_DEPLOY)
			.setDescription(MESSAGE_DESCRIPTION.format(context.application, context.environment))
	}
}
