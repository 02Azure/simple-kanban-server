const bcrypt = require("bcrypt")

function checkPassword(input, dbpassword) {
	return bcrypt.compareSync(input, dbpassword);
}

module.exports = checkPassword