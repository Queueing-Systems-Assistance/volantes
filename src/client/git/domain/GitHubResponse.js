class GitHubResponse {

	constructor(data) {
		if (data.data) {
			this.data = new GitHubData(data.data)
		}
		if (data.errors) {
			this.errors = data.errors.map(error => new GitHubError(error))
		}
	}
}

class GitHubData {

	constructor(data) {
		if (data.repository) {
			this.repository = new GitHubRepository(data.repository)
		}
	}
}

class GitHubRepository {

	constructor(data) {
		if (data.refs) {
			this.refs = new GitHubRefs(data.refs)
		}
		if (data.object) {
			this.object = new GitHubObject(data.object)
		}
	}
}

class GitHubObject {

	constructor(data) {
		if (data.associatedPullRequests) {
			this.associatedPullRequests = new GitHubAssociatedPullRequests(data.associatedPullRequests)
		}
		if (data.message) {
			this.message = data.message
		}
	}

}

class GitHubAssociatedPullRequests {

	constructor(data) {
		if (data.totalCount !== null) {
			this.totalCount = data.totalCount
		}
		if (data.nodes) {
			this.nodes = data.nodes.map(node => new GitHubPullRequestNode(node))
		}
	}
}

class GitHubRefs {

	constructor(data) {
		if (data.totalCount !== null) {
			this.totalCount = data.totalCount
		}
		if (data.nodes) {
			this.nodes = data.nodes.map(node => new GitHubCommitNode(node))
		}
	}
}

class GitHubPullRequestNode {

	constructor(data) {
		if (data.title) {
			this.title = data.title
		}
	}
}

class GitHubCommitNode {

	constructor(data) {
		if (data.name) {
			this.name = data.name
		}
		if (data.target) {
			this.target = new GitHubTarget(data.target)
		}
	}
}

class GitHubTarget {

	constructor(data) {
		if (data.commitResourcePath) {
			this.commitResourcePath = data.commitResourcePath
		}
	}
}

class GitHubError {

	constructor(data) {
		if (data.message) {
			this.message = data.message
		}
	}

}

module.exports = {
	GitHubResponse
}
