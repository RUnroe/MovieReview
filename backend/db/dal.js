const bcrypt = require('bcryptjs');
// const firebase = require('firebase');
// const admin = require("firebase-admin");
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


