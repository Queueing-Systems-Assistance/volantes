const DeployFacade = require('../facade/DeployFacade')
const DeployHelpMessageAssembler = require('../assembler/DeployHelpMessageAssembler')
const ContextValidator = require('../validator/CompositeContextValidator')
const DeployContextResolver = require('../resolver/DeployContextResolver')

const COMMAND_NAME_DEPLOY = 'deploy'

module.exports = {
	name: COMMAND_NAME_DEPLOY,
	/**
	 * Executes deploy command.
	 * @param {Message} message message from Discord
	 * @param {string[]} args message arguments
	 */
	execute(message, args) {
		const context = DeployContextResolver.resolve(args)
		if (ContextValidator.isValid(context)) {
			DeployFacade.deploy(context, message)
		} else {
			message.channel.send(DeployHelpMessageAssembler.assemble(message.author.id))
		}
	}
}
