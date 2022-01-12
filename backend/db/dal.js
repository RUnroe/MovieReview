const bcrypt = require('bcryptjs');
const short = require('short-uuid');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');



initializeApp({credential: cert(require('../secrets').firebase)});
const db = getFirestore();




//TODO: adjust for bcrypt later
const hash = (pw) => {
	return  bcrypt.hashSync(pw, 8);
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
		{name: "password", value: _user.password, regex: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/}
	]);
	if (errors.length) {
		throw errors;
	}

    //salt and hash password
    let securePassword = hash(_user.password);
    console.log(_user.password, securePassword, verify_hash(_user.password, securePassword));

    //add user to database
    const userId = genId();

    const result = await db.collection('users').doc(userId).set({
        username: _user.username,
        password: securePassword,
        is_admin: false,
        api_key: genId(),
        user_id: userId

    });
    console.log(result);
    return {user_id: userId, is_admin: false};

}


module.exports =  {
	createUser
};