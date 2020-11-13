const ErrorEmbedMessageAssembler = require('../assembler/ErrorMessageAssembler')
const UpdateEmbedMessageAssembler = require('../assembler/UpdateMessageAssembler')
const CompletedEmbedMessageAssembler = require('../assembler/CompletedMessageAssembler')
const TriggeredEmbedMessageAssembler = require('../assembler/TriggeredMessageAssembler')
const DockerFacade = require('../../../client/docker/facade/DockerFacade')

module.exports = {
	/**
	 * Facade to wrap the deployment.
	 * @param {DeployContext} context context
	 * @param {Message} message message from Discord
	 */
	deploy(context, message) {
		TriggeredEmbedMessageAssembler.process(context, message)
			.then(() => UpdateEmbedMessageAssembler.process(context, message))
			.then(() => DockerFacade.update(context))
			.then(() => CompletedEmbedMessageAssembler.process(context, message))
			.catch(errorMessage => ErrorEmbedMessageAssembler.process(context, message, errorMessage))
	}
}
