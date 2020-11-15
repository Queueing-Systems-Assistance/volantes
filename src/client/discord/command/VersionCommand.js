const VersionMessageAssembler = require('../assembler/version/VersionMessageAssembler')

const COMMAND_NAME_VERSION = 'version'
module.exports = {
	name: COMMAND_NAME_VERSION,
	/**
	 * Executes version command.
	 * @param {Message} message message from Discord
	 */
	execute(message) {
		VersionMessageAssembler.process(message)
	}
}
