const ContainerConfigResolver = require('../../../resolver/ContainerConfigResolver')

module.exports = {
	/**
	 * Resolves IP address for a container.
	 * @param {string} containerName name of the container
	 * @returns {string} IP address
	 */
	resolve(containerName) {
		const containerConfig = ContainerConfigResolver.resolve(containerName)
		return containerConfig.ip
	}
}
