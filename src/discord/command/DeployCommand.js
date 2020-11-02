const ErrorEmbedMessageAssembler = require('../assembler/ErrorMessageAssembler')
const UpdateEmbedMessageAssembler = require('../assembler/UpdateMessageAssembler')
const CompletedEmbedMessageAssembler = require('../assembler/CompletedMessageAssembler')
const TriggeredEmbedMessageAssembler = require('../assembler/TriggeredMessageAssembler')
const DeployHelpMessageAssembler = require('../assembler/DeployHelpMessageAssembler')
const ArgumentValidator = require('../validator/CompositeArgumentValidator')
const DeployContextResolver = require('../resolver/DeployContextResolver')

const COMMAND_NAME_DEPLOY = 'deploy'

const executeCommand = (message, context) => {
	// TODO: QSA-51
	message.channel.send(TriggeredEmbedMessageAssembler.assemble(message.author.id, context))
	message.channel.send(UpdateEmbedMessageAssembler.assemble(context))
	message.channel.send(CompletedEmbedMessageAssembler.assemble(context))
	message.channel.send(ErrorEmbedMessageAssembler.assemble(context))
}

module.exports = {
	name: COMMAND_NAME_DEPLOY,
	execute(message, args) {
		const context = DeployContextResolver.resolve(args)
		if (!ArgumentValidator.validate(context)) {
			return message.channel.send(DeployHelpMessageAssembler.assemble(message.author.id))
		}
		executeCommand(message, context)
	}
}
