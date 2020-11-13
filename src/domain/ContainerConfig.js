class ContainerConfig {

	constructor(data) {
		this.ip = data.ip
		this.env = data.env
		this.mounts = data.mounts
		this.image = data.image
	}
}

module.exports = {
	ContainerConfig: ContainerConfig
}
