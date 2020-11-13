const ContainerNetworkAssembler = require('./ContainerNetworkAssembler')
const ContainerHostAssembler = require('./ContainerHostAssembler')
const ContainerEnvironmentVariableAssembler = require('../assembler/ContainerEnvironmentVariableAssembler')
const ContainerImageAssembler = require('../assembler/ContainerImageAssembler')

module.exports = {
	/**
	 * Assembles container properties.
	 * @param {DeployContext} context context
	 * @returns {object} assembled properties for creating a new container
	 */
	assemble(context) {
		return {
			HostConfig: ContainerHostAssembler.assemble(context),
			Env: ContainerEnvironmentVariableAssembler.resolve(context),
			Image: ContainerImageAssembler.assemble(context),
			NetworkingConfig: ContainerNetworkAssembler.assemble(context)
		}
	}
}
