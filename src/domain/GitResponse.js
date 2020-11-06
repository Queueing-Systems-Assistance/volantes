class GitResponse {

	constructor(builder) {
		this.jiraKey = builder.jiraKey
		this.message = builder.environment
	}

	static get Builder() {
		class Builder {

			withJiraKey(jiraKey) {
				this.jiraKey = jiraKey
				return this
			}

			withMessage(message) {
				this.message = message
				return this
			}

			build() {
				return new GitResponse(this)
			}
		}

		return Builder
	}
}

module.exports = {
	GitResponse
}
