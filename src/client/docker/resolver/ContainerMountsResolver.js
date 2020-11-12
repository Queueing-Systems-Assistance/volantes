const ContainerConfigResolver = require('../../../resolver/ContainerConfigResolver')

module.exports = {
	/**
	 * Resolves mounts for a container.
	 * @param {string} containerName name of the container
	 * @returns {string[]} mounts
	 */
	resolve(containerName) {
		const containerConfig = ContainerConfigResolver.resolve(containerName)
		return containerConfig.mounts
	}
}
