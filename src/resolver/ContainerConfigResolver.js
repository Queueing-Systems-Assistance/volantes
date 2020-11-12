const { ContainerConfig } = require('../domain/ContainerConfig')

module.exports = {
	/**
	 * Resolves container options.
	 * @param {string} containerName name of the container
	 * @returns {ContainerConfig} resolved container options
	 */
	resolve(containerName) {
		const config = require('../../resources/{0}.json'.format(containerName))
		return new ContainerConfig(config)
	}
}
