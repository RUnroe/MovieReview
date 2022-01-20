const bcrypt = require('bcryptjs');
const short = require('short-uuid');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// const fs = require("fs");
// csv = fs.readFileSync("users2-Group2.csv")

// var array = csv.toString().split("\r");

// let result = [];
 
// let headers = array[0].split(", ")

// for (let i = 1; i < array.length - 1; i++) {
//   let obj = {}

//   let str = array[i]
//   let s = ''

//   let flag = 0
//   for (let ch of str) {
//     if (ch === '"' && flag === 0) {
//       flag = 1
//     }
//     else if (ch === '"' && flag == 1) flag = 0
//     if (ch === ', ' && flag === 0) ch = '|'
//     if (ch !== '"') s += ch
//   }

//   let properties = s.split("|")

//   for (let j in headers) {
//     if (properties[j].includes(", ")) {
//       obj[headers[j]] = properties[j]
//         .split(", ").map(item => item.trim())
//     }
//     else obj[headers[j]] = properties[j]
//   }

//   result.push(obj)
// }

// let json = JSON.stringify(result);
// fs.writeFileSync('output.json', json);

initializeApp({credential: cert(require('./secrets.json').firebase)});
const db = getFirestore();
//console.log(db);
const fs = require("fs");
const { errors } = require('jose');

json = JSON.parse(fs.readFileSync("csvjson.json"));

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
		if(isFieldEmpty(field.value) || typeof field.value != (field.type ? field.type : "string") ||(field.regex && !field.regex.test(field.value))) {
			errors.push(`Expected ${field.name}, but ${field.value} was supplied`);
		}
	});
	return errors;
}

const createUser = async (_user) => {
    _user.zip_code = `${_user.zip_code}`;
    _user.phone = `${_user.phone}`;
    _user.password = `${_user.password}`;

     //validate data
     const errors = findErrors([
		{name: "email", value: _user.email, regex: /\w+@\w+\.\w+/}, 
		{name: "password", value: _user.password, regex:   /^.{6,}$/},
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
    console.log(result);
    return {user_id: userId, is_admin: false};

}

const PlzWork = async () => {
    for(let i = 0; i < json.length; i++){
        await createUser(json[i]).catch(errors => (console.log(errors)));
    }
}

PlzWork();
//createUser(json[0])
console.log("finish");