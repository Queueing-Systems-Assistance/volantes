const Discord = require('discord.js')
const ColorResolver = require('../resolver/ColorResolver')

const MESSAGE_TITLE_DEPLOY = 'Deploy Failed'
const MESSAGE_DESCRIPTION = 'A `{0}` deployment to `{1}` has failed. View logs for more clues.'

module.exports = {
	assemble(context) {
		return new Discord.MessageEmbed()
			.setColor(ColorResolver.RED)
			.setTitle(MESSAGE_TITLE_DEPLOY)
			.setDescription(MESSAGE_DESCRIPTION.format(context.application, context.environment))
	}
}
