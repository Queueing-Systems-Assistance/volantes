const ContainerConfigResolver = require('../../../resolver/ContainerConfigResolver')
const ContainerNameAssembler = require('../assembler/ContainerNameAssembler')

module.exports = {
	/**
	 * Resolves docker container environment variables.
	 * @param {DeployContext} context context
	 * @returns {string[]} key-value pair environment variables
	 */
	resolve(context) {
		const containerName = ContainerNameAssembler.assemble(context)
		const containerConfig = ContainerConfigResolver.resolve(containerName)
		const env = containerConfig.env
		const keys = Object.keys(env)
		return keys.map(key => key + '=' + env[key])
	}
}
