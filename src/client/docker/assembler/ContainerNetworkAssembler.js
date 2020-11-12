const ContainerIPAddressResolver = require('../resolver/ContainerIPAddressResolver')
const ContainerNameAssembler = require('../assembler/ContainerNameAssembler')

module.exports = {
	/**
	 * Assembles container NETWORK property.
	 * @param {DeployContext} context context
	 * @returns {object} assembled NETWORK property with EndpointsConfig and IPv4Address
	 */
	assemble(context) {
		const containerName = ContainerNameAssembler.assemble(context)
		return {
			EndpointsConfig: {
				'qsaNet': {
					IPAMConfig: {
						IPv4Address: ContainerIPAddressResolver.resolve(containerName)
					}
				}
			}
		}
	}
}
