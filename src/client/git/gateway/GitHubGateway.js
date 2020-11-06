const fetch = require('node-fetch')
const RepositoryNameMapper = require('../mapper/RepositoryNameMapper')
const { GitHubResponse } = require('../domain/GitHubResponse')

const COMMIT_HASH_QUERY = `
{
  repository(owner: "{0}", name: "{1}") {
    refs(refPrefix: "refs/tags/", first: 1, query: "{2}") {
      totalCount
      nodes {
        name
        target {
          commitResourcePath
        }
      }
    }
  }
}

`
const COMMIT_MESSAGE_QUERY = `
{
  repository(owner: "{0}", name: "{1}") {
    object(oid: "{2}") {
      ... on Commit {
        associatedPullRequests(first: 1) {
          totalCount
          nodes {
            title
          }
        }
        message
      }
    }
  }
}
`
const ERROR_GITHUB_FETCH_MESSAGE = 'Cannot fetch data from GitHub, response code [{0}]'
const GITHUB_ENDPOINT = process.env.GITHUB_ENDPOINT
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_ORG = process.env.GITHUB_ORG

const GITHUB_HEADERS = {
	'Authorization': 'Bearer {0}'.format(GITHUB_TOKEN),
	'Content-type': 'application/json',
	'Accept': 'application/json',
	'Accept-Charset': 'utf-8'
}

const isResponseStatusOK = response => response.status === 200
const getResponse = query => fetch(GITHUB_ENDPOINT, {
	method: 'post',
	headers: GITHUB_HEADERS,
	body: JSON.stringify({ query: query })
})

module.exports = {
	/**
	 * Fetches commit hash from tagged commit.
	 * @param {DeployContext} context context
	 * @returns {GitHubResponse} response
	 */
	async getCommitHash(context) {
		const repositoryName = RepositoryNameMapper.map(context.application)
		const query = COMMIT_HASH_QUERY.format(GITHUB_ORG, repositoryName, context.version)
		const response = await getResponse(query)
		if (!isResponseStatusOK(response)) {
			throw ERROR_GITHUB_FETCH_MESSAGE.format(response.status)
		}
		return new GitHubResponse(await response.json())
	},
	/**
	 * Fetches commit message from commit hash.
	 * @param {string} application name
	 * @param {string} commitHash context
	 * @returns {GitHubResponse} response
	 */
	async getCommitMessage(application, commitHash) {
		const repositoryName = RepositoryNameMapper.map(application)
		const query = COMMIT_MESSAGE_QUERY.format(GITHUB_ORG, repositoryName, commitHash)
		const response = await getResponse(query)
		if (!isResponseStatusOK(response)) {
			throw ERROR_GITHUB_FETCH_MESSAGE.format(response.status)
		}
		return new GitHubResponse(await response.json())
	}
}
