const bcrypt = require('bcryptjs');

let salt = bcrypt.genSaltSync(10);

//TODO: adjust for bcrypt later
const hash = async (pw) => {
	return bcrypt.hashSync(pw, salt)
		.catch(err => {
			throw ['An error occurred while hashing password'];
		});
};
const verify_hash = (input, hash) => bcrypt.compareSync(input, hash);



