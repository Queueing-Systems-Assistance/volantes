const ContainerConfigResolver = require('../../../resolver/ContainerConfigResolver')

module.exports = {
	/**
	 * Resolves container image.
	 * @param {string} containerName name of the container
	 * @returns {string} resolved docker image name
	 */
	resolve(containerName) {
		const containerConfig = ContainerConfigResolver.resolve(containerName)
		return containerConfig.image
	}
}
