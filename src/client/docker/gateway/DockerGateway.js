const fetch = require('node-fetch')
const DockerParameterMapper = require('../mapper/DockerParameterMapper')
const DockerHeaderMapper = require('../mapper/DockerHeaderMapper')
const logger = require('../../../config/LoggingConfig')(__filename)

const ERROR_DOCKER_STOP_CONTAINER_MESSAGE = 'Cannot stop container with DockerAPI, response code [{0}]'
const ERROR_DOCKER_REMOVE_CONTAINER_MESSAGE = 'Cannot remove container with DockerAPI, response code [{0}]'
const ERROR_DOCKER_PULL_IMAGE_MESSAGE = 'Cannot pull image with DockerAPI, response code [{0}], message [{1}]'
const ERROR_DOCKER_CREATE_CONTAINER_MESSAGE = 'Cannot create container with DockerAPI, response code [{0}], message [{1}]'
const ERROR_DOCKER_START_CONTAINER_MESSAGE = 'Cannot start container with DockerAPI, response code [{0}]'

const RESPONSE_STATUSES_OK = [200, 201, 204]

const DOCKER_HOST_CONTAINER_STOP = process.env.DOCKER_HOST + process.env.DOCKER_ENDPOINT_CONTAINER_STOP
const DOCKER_HOST_CONTAINER_START = process.env.DOCKER_HOST + process.env.DOCKER_ENDPOINT_CONTAINER_START
const DOCKER_HOST_CONTAINER_REMOVE = process.env.DOCKER_HOST + process.env.DOCKER_ENDPOINT_CONTAINER_REMOVE
const DOCKER_HOST_PULL_IMAGE = process.env.DOCKER_HOST + process.env.DOCKER_ENDPOINT_PULL_IMAGE
const DOCKER_HOST_CONTAINER_CREATE = process.env.DOCKER_HOST + process.env.DOCKER_ENDPOINT_CONTAINER_CREATE

const isResponseStatusOK = (response) => RESPONSE_STATUSES_OK.includes(response)
const getResponse = (endpoint, options) => fetch(endpoint, options)

const STOPPING_CONTAINER_LOG_MESSAGE = 'Stopping container [{0}]'
const STARTING_CONTAINER_LOG_MESSAGE = 'Starting container [{0}]'
const REMOVING_CONTAINER_LOG_MESSAGE = 'Removing container [{0}]'
const PULLING_CONTAINER_LOG_MESSAGE = 'Pulling image [{0}]'
const CREATING_CONTAINER_LOG_MESSAGE = 'Creating container [{0}]'

module.exports = {
	/**
	 * Stops a docker container.
	 * @param {string} containerName name of the container
	 */
	async stopDockerContainer(containerName) {
		logger.info(STOPPING_CONTAINER_LOG_MESSAGE.format(containerName))
		const options = { method: 'post' }
		const response = await getResponse(DOCKER_HOST_CONTAINER_STOP.format(containerName), options)
		if (!isResponseStatusOK(response)) {
			throw ERROR_DOCKER_STOP_CONTAINER_MESSAGE.format(response.status)
		}
	},
	/**
	 * Starts a docker container.
	 * @param {string} containerName name of the container
	 */
	async startDockerContainer(containerName) {
		logger.info(STARTING_CONTAINER_LOG_MESSAGE.format(containerName))
		const options = { method: 'post' }
		const response = await getResponse(DOCKER_HOST_CONTAINER_START.format(containerName), options)
		if (!isResponseStatusOK(response)) {
			throw ERROR_DOCKER_START_CONTAINER_MESSAGE.format(response.status)
		}
	},
	/**
	 * Removes a docker container.
	 * @param {string} containerName name of the container
	 */
	async removeDockerContainer(containerName) {
		logger.info(REMOVING_CONTAINER_LOG_MESSAGE.format(containerName))
		const options = { method: 'delete' }
		const response = await getResponse(DOCKER_HOST_CONTAINER_REMOVE.format(containerName), options)
		if (!isResponseStatusOK(response)) {
			throw ERROR_DOCKER_REMOVE_CONTAINER_MESSAGE.format(response.status)
		}
	},
	/**
	 * Pull a docker image.
	 * @param {string} imageName name of the image
	 */
	async pullDockerContainer(imageName) {
		logger.info(PULLING_CONTAINER_LOG_MESSAGE.format(imageName))
		const options = {
			headers: DockerHeaderMapper.mapAuthHeaders(),
			method: 'post'
		}
		const endpoint = DockerParameterMapper.mapDockerPullImageParameters(DOCKER_HOST_PULL_IMAGE, imageName)
		const response = await getResponse(endpoint, options)
		if (!isResponseStatusOK(response)) {
			throw ERROR_DOCKER_PULL_IMAGE_MESSAGE.format(response.status, JSON.stringify(await response.json()))
		}
	},
	/**
	 * Creates a docker container.
	 * @param {string} containerName name of the container
	 * @param {object} containerOptions container config, {@link https://docs.docker.com/engine/api/v1.37/#operation/ContainerCreate}
	 */
	async createDockerContainer(containerName, containerOptions) {
		logger.info(CREATING_CONTAINER_LOG_MESSAGE.format(containerName))
		const options = {
			headers: DockerHeaderMapper.mapDefaultHeaders(),
			method: 'post',
			body: JSON.stringify(containerOptions)
		}
		const endpoint = DockerParameterMapper.mapDockerCreateContainerParameters(DOCKER_HOST_CONTAINER_CREATE, containerName)
		const response = await getResponse(endpoint, options)
		if (!isResponseStatusOK(response)) {
			throw ERROR_DOCKER_CREATE_CONTAINER_MESSAGE.format(response.status, JSON.stringify(await response.json()))
		}
	}
}
