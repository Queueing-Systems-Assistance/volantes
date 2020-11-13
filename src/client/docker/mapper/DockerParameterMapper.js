const PARAMETER_PULL_IMAGE = '{0}?fromImage={1}'
const PARAMETER_CREATE_CONTAINER = '{0}?name={1}'

module.exports = {
	/**
	 * Maps docker pull image parameters.
	 * @param {string} host pull image docker api endpoint
	 * @param {string} imageName name of the docker image
	 * @returns {string} mapped endpoint
	 */
	mapDockerPullImageParameters(host, imageName) {
		return PARAMETER_PULL_IMAGE.format(host, imageName)
	},
	/**
	 * Maps docker container creation parameters.
	 * @param {string} host image creation docker api endpoint
	 * @param {string} containerName name of the new container
	 * @returns {string} mapped endpoint
	 */
	mapDockerCreateContainerParameters(host, containerName) {
		return PARAMETER_CREATE_CONTAINER.format(host, containerName)
	}
}
