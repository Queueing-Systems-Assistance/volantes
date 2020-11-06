const REPOSITORY_PREFIX = 'qsa-{0}'

module.exports = {
	/**
	 * Maps {@link DeployContext#application} attribute to the correct application repository name.
	 * @param {string} applicationName name of the application
	 * @returns {string} mapped application repository name
	 */
	map(applicationName) {
		return REPOSITORY_PREFIX.format(applicationName)
	}
}
