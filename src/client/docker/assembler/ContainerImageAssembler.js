const ContainerNameAssembler = require('../assembler/ContainerNameAssembler')
const ContainerImageResolver = require('../resolver/ContainerImageResolver')

module.exports = {
	/**
	 * Assembles container image.
	 * @param {DeployContext} context context
	 * @returns {string} assembled docker image name
	 */
	assemble(context) {
		const containerName = ContainerNameAssembler.assemble(context)
		return ContainerImageResolver.resolve(containerName).format(context.version)
	}
}
