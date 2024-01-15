const { showError } = require('../utils/maintenance/showError')

module.exports = {
    name: 'error',
    execute(err) {
        showError(err)
    },
}
