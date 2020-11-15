const Discord = require('discord.js')
const ColorResolver = require('../resolver/ColorResolver')

const COMMA_DELIMITER = ','
const USAGE_MESSAGE = `
Hey <@{0}>
This command can deploy an app to an environment. Make sure your artifact has been successfully built first :face_with_monocle:
Usage:
\`volantes deploy ENVIRONMENT APP VERSION\`

Example: 
# Deploy calculator to lab environment
\`volantes deploy lab calculator 1.0.feature/QSA-12_28\`

# Deploy formula-handler to prod environment
\`volantes deploy prod formula-handler 1.0.43\`

You can deploy __**feature branch**__ to __**LAB**__ environment and __**config pack**__ to __**PROD**__ environment`

const NEW_LINE_DELIMITER = '\n'
const SUPPORTED_APPLICATIONS = process.env.DEPLOY_APPLICATIONS.split(COMMA_DELIMITER)
const SUPPORTED_ENVIRONMENTS = process.env.DEPLOY_ENVIRONMENTS.split(COMMA_DELIMITER)
const SUPPORTED_ENVIRONMENTS_FIELD = 'Supported Environments'
const SUPPORTED_APPLICATIONS_FIELD = 'Supported Applications'

module.exports = {
	/**
	 * Assembles deploy embed message for Discord.
	 * @param {string} userId id of the message author
	 * @returns {MessageEmbed} embed message for discord
	 */
	assemble(userId) {
		return new Discord.MessageEmbed()
			.setColor(ColorResolver.GRAY)
			.setDescription(USAGE_MESSAGE.format(userId))
			.addField(SUPPORTED_ENVIRONMENTS_FIELD, SUPPORTED_ENVIRONMENTS.join(NEW_LINE_DELIMITER))
			.addField(SUPPORTED_APPLICATIONS_FIELD, SUPPORTED_APPLICATIONS.join(NEW_LINE_DELIMITER))
	}
}
