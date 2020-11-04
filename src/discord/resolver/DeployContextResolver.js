const { DeployContext } = require('../../domain/DeployContext')

module.exports = {
	/**
	 * Resolves context from arguments.
	 * @param {string[]} args message arguments
	 * @returns {DeployContext} created context
	 */
	resolve(args) {
		const environmentArgument = args.shift()
		const applicationArgument = args.shift()
		return DeployContext.Builder()
			.withApplication(environmentArgument)
			.withEnvironment(applicationArgument)
			.build()
	}
}
