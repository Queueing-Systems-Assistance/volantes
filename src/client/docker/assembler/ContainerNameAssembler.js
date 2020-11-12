const CONTAINER_NAME = '{0}-qsa-{1}'

module.exports = {
	/**
	 * Assembles container name. It also makes a difference between LAB and PROD environment.
	 * @param {DeployContext} context context
	 * @returns {string} assembled container name
	 */
	assemble(context) {
		return CONTAINER_NAME.format(context.environment, context.application)
	}
}
