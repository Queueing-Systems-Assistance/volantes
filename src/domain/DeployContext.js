class DeployContext {

	constructor(builder) {
		this.application = builder.application
		this.environment = builder.environment
	}

	static get Builder() {
		class Builder {

			withApplication(application) {
				this.application = application
				return this
			}

			withEnvironment(environment) {
				this.environment = environment
				return this
			}

			build() {
				return new DeployContext(this)
			}
		}

		return Builder
	}
}

module.exports = {
	DeployContext
}
