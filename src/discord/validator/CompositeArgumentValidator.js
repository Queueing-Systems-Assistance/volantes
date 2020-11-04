const ApplicationArgumentValidator = require('./ApplicationArgumentValidator')
const EnvironmentArgumentValidator = require('./EnvironmentArgumentValidator')

const validators = [
	ApplicationArgumentValidator,
	EnvironmentArgumentValidator
]

module.exports = {
	/**
	 * Validates arguments.
	 * @param {string[]} args message arguments
	 * @returns {boolean} true if arguments are supported, false otherwise
	 */
	validate(args) {
		return !validators.map(validator => validator.validate(args)).includes(false)
	}
}
