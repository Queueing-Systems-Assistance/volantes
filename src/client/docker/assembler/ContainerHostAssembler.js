const ContainerMountsResolver = require('../resolver/ContainerMountsResolver')
const ContainerNameAssembler = require('../assembler/ContainerNameAssembler')

module.exports = {
	/**
	 * Assembles container HOST property.
	 * @param {DeployContext} context context
	 * @returns {object} assembled HOST property with RestartPolicy and Mounts
	 */
	assemble(context) {
		const containerName = ContainerNameAssembler.assemble(context)
		return {
			RestartPolicy: {
				Name: 'always'
			},
			Mounts: ContainerMountsResolver.resolve(containerName)
		}
	}
}
