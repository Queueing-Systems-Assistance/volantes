const ApplicationArgumentValidator = require('./ApplicationArgumentValidator')
const EnvironmentArgumentValidator = require('./EnvironmentArgumentValidator')

const validators = [
	ApplicationArgumentValidator,
	EnvironmentArgumentValidator
]

module.exports = {
	validate(args) {
		return !validators.map(validator => validator.validate(args)).includes(false)
	}
}
