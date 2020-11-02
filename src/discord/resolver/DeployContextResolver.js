const createArgumentsContext = (application, environment) => ({
	application: application,
	environment: environment
})

module.exports = {
	resolve(args) {
		const environmentArgument = args.shift()
		const applicationArgument = args.shift()
		return createArgumentsContext(applicationArgument, environmentArgument)
	}
}
