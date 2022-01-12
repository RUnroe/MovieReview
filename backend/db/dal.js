const bcrypt = require('bcryptjs');
const short = require('short-uuid');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');



initializeApp({credential: cert(require('../secrets').firebase)});
const db = getFirestore();


let salt = bcrypt.genSaltSync(10);

//TODO: adjust for bcrypt later
const hash = async (pw) => {
	return bcrypt.hashSync(pw, salt)
		.catch(err => {
			throw ['An error occurred while hashing password'];
		});
};
const verify_hash = (input, hash) => bcrypt.compareSync(input, hash);

const translator = short();
const genId = () => (translator.new());


const isFieldEmpty = field => {
	return (field === undefined || field === null);
}
const findErrors = fields => {
	const errors = [];
	fields.forEach(field => {
		if(isFieldEmpty(field.value) || typeof field.value != (field.type ? field.type : "string") ||(field.regex && !field.regex.test(field.value))) {
			errors.push(`Expected ${field.name}, but ${field.value} was supplied`);
		}
	});
	return errors;
}


// ==============================
//            Users
// ==============================

const createUser = async (_user) => {
    //validate data
    const errors = findErrors([
		{name: "username", value: _user.username, regex: /^[a-zA-Z0-9_ ]+$/}, 
		{name: "password", value: _user.password, regex: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/}
	]);
	if (errors.length) {
		throw errors;
	}

    //salt and hash password


    //add user to database
    const userId = genId();

    const result = await db.collection('users').doc(userId).set({
        username: _user.username,
        password: securePassword,
        is_admin: false,
        api_key: genId(),
        user_id: userId

    });

    //create session for user 

}
console.log(genId());