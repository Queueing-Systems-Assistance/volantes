const ErrorEmbedMessageAssembler = require('../assembler/ErrorMessageAssembler')
const UpdateEmbedMessageAssembler = require('../assembler/UpdateMessageAssembler')
const CompletedEmbedMessageAssembler = require('../assembler/CompletedMessageAssembler')
const TriggeredEmbedMessageAssembler = require('../assembler/TriggeredMessageAssembler')

module.exports = {
	/**
	 * Facade to wrap the deployment.
	 * @param {DeployContext} context context
	 * @param {Message} message message from Discord
	 */
	deploy(context, message) {
		TriggeredEmbedMessageAssembler.process(context, message)
			.then(() => UpdateEmbedMessageAssembler.process(context, message))
			.then(() => CompletedEmbedMessageAssembler.process(context, message))
			.catch(errorMessage => ErrorEmbedMessageAssembler.process(context, message, errorMessage))
	}
}
