const bcrypt = require('bcryptjs');
const short = require('short-uuid');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


initializeApp({credential: cert(require('../secrets.json').firebase)});
const db = getFirestore();
// console.log(db);
const fs = require("fs");

json = JSON.parse(fs.readFileSync("./csvjson.json"));

const hash = (pw) => {
	return  bcrypt.hashSync(pw, 8);
};

const translator = short();
const genId = () => (translator.new());

const isFieldEmpty = field => {
	return (field === undefined || field === null);
}
const findErrors = fields => {
	const errors = [];
	fields.forEach(field => {
        //make value a string if I can
        if((!field.type || field.type === "string") && typeof field.value != "string") field.value = `${field.value}`; 
		if(isFieldEmpty(field.value) || typeof field.value != (field.type ? field.type : "string") ||(field.regex && !field.regex.test(field.value))) {
			errors.push(`Expected ${field.name}, but ${field.value} was supplied`);
		}
	});
	return errors;
}

const createUser = async (_user) => {


     //validate data
     const errors = findErrors([
		{name: "email", value: _user.email, regex: /\w+@\w+\.\w+/}, 
		{name: "password", value: _user.password, regex: /^.{6,}$/},
		{name: "phone", value: _user.phone},
		{name: "first name", value: _user.fname, regex:  /./}, 
		{name: "last name", value: _user.lname, regex:  /./}, 
		{name: "street", value: _user.street, regex: /../},
		{name: "city", value: _user.city, regex:  /../},
		{name: "state", value: _user.state, regex: /^[a-z, A-Z]{2}$/},
		{name: "zip code", value: _user.zip_code, regex: /^[0-9]{5}(-[0-9]{4})?$/m},

	]);
	if (errors.length) {
		throw errors;
	}

    //salt and hash password
    let securePassword = hash(_user.password);
    //console.log(securePassword)

    //add user to database
    const userId = genId();
    //console.log(userId);
    const result = await db.collection('users').doc(userId).set({
        email: _user.email,
        password: securePassword,
        phone: _user.phone,
        fname: _user.fname,
        lname: _user.lname,
        street: _user.street,
        city: _user.city,
        state: _user.state,
        zip_code: `${_user.zip_code}`,
        is_admin: false,
        api_key: genId(),
        user_id: userId

    }).catch(e => console.log(e));
    // console.log(result);
    return {user_id: userId, is_admin: false};

}

const PlzWork = async () => {
    for(let i = 0; i < json.length; i++){
        await createUser(json[i]).catch(errors => (console.log(errors)));
    }
    console.log("finish");
}

PlzWork();
//createUser(json[0])
