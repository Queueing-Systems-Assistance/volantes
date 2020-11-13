const ContainerNameAssembler = require('../assembler/ContainerNameAssembler')
const ContainerImageAssembler = require('../assembler/ContainerImageAssembler')
const ContainerOptionsAssembler = require('../assembler/ContainerOptionsAssembler')
const DockerGateway = require('../gateway/DockerGateway')
const logger = require('../../../config/LoggingConfig')(__filename)

const DOCKER_CONTAINER_UPDATE_SUCCESSFUL = 'Update was successful [environment={0}] [application={1}] [version={2}]'

module.exports = {
	/**
	 * Facade to update docker container.
	 * @param {DeployContext} context context
	 */
	async update(context) {
		const imageName = ContainerImageAssembler.assemble(context)
		const containerName = ContainerNameAssembler.assemble(context)
		const containerOptions = ContainerOptionsAssembler.assemble(context)
		await DockerGateway.pullDockerContainer(imageName)
		await DockerGateway.stopDockerContainer(containerName)
		await DockerGateway.removeDockerContainer(containerName)
		await DockerGateway.createDockerContainer(containerName, containerOptions)
		await DockerGateway.startDockerContainer(containerName)
		logger.info(DOCKER_CONTAINER_UPDATE_SUCCESSFUL.format(context.environment, context.application, context.version))
	}
}
