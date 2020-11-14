const Discord = require('discord.js')
const ColorResolver = require('../resolver/ColorResolver')
const GitCommitFetchFacade = require('../../git/facade/GitCommitFetchFacade')
const VolantesVersionResolver = require('../resolver/VolantesVersionResolver')

const MESSAGE_TITLE_DEPLOY = 'Deploy Update'
const MESSAGE_DESCRIPTION = 'The deploy of `{0}` to `{1}` is running :rocket:'

const createResponse = (gitResponse, context) => new Discord.MessageEmbed()
	.setColor(ColorResolver.YELLOW)
	.setTitle(MESSAGE_TITLE_DEPLOY)
	.addField('Commit', gitResponse.message, true)
	.addField('Version', context.version, true)
	.addField('JIRA', gitResponse.jiraKey, true)
	.setDescription(MESSAGE_DESCRIPTION.format(context.application, context.environment))
	.setFooter(VolantesVersionResolver.resolve())

module.exports = {
	/**
	 * Assembles an update embed message for discord.
	 * @param {DeployContext} context deploy context
	 * @param {Message} message message from Discord
	 */
	async process(context, message) {
		const gitResponse = await GitCommitFetchFacade.process(context)
		const messageEmbed = createResponse(gitResponse, context)
		message.channel.send(messageEmbed)
	}
}
