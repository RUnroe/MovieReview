const bcrypt = require('bcryptjs');
const short = require('short-uuid');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');



initializeApp({credential: cert(require('../secrets').firebase)});
const db = getFirestore();
// console.log(db);



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
        //make value a string if I can
        if((!field.type || field.type === "string") && typeof field.value != "string") field.value = `${field.value}`; 
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
		{name: "email", value: _user.email, regex: /\w+@\w+\.\w+/}, 
		{name: "password", value: _user.password, regex: /^.{6,}$/},
		{name: "phone", value: _user.phone, regex: /^(1?\([0-9]{3}\)( |)|(1-|1)?[0-9]{3}-?)[0-9]{3}-?[0-9]{4}$/m},
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

    //check if email already exists

    if( await getUserByEmail(_user.email)) throw "User already exists with that email";

    //salt and hash password
    let securePassword = hash(_user.password);

    //add user to database
    const userId = genId();

    const result = await db.collection('users').doc(userId).set({
        email: _user.email,
        password: securePassword,
        phone: _user.phone,
        fname: _user.fname,
        lname: _user.lname,
        street: _user.street,
        city: _user.city,
        state: _user.state,
        zip_code: _user.zip_code,
        is_admin: false,
        api_key: genId(),
        user_id: userId

    });
    console.log(result);
    return {user_id: userId, is_admin: false};

}

const getUserByEmail = async (email) => {
    //Check for input errors
    const errors = findErrors([
		{name: "email", value: email, regex: /\w+@\w+\.\w+/}, 
	]);
	if (errors.length) {
		throw errors;
	}
    //Get user by email
    const user = await db.collection('users').where("email", "==", email).get();
    return user._size;
}

const getUserById = async (user_id) => {
    //Make sure user_id is a string
    user_id = `${user_id}`;
    
    //Get user by user_id
    const user = await db.collection('users').doc(user_id).get();
    if(!user.exists) throw `User with id (${user_id}) not found`;
    else {
        //Delete password and return back
        let userData = user.data();
        delete userData.password; 
        return userData;
    }
}

const updatePassword = async (user_id, password) => {
    //validate password
    const errors = findErrors([fields.push({name: "password", value: password, regex: /^.{6,}$/})]);
	if (errors.length) {
		throw errors;
	}


    //salt and hash password
    let securePassword = hash(password);
    console.log(password, securePassword, verify_hash(password, securePassword));

    //update password in database
    const result = await db.collection('users').doc(user_id).update({password: securePassword});
    console.log(result);
}


const removeUser = async (user_id) => {
    //Make sure user_id is a string
    user_id = `${user_id}`;
    
    //remove user by user_id
    const result = await db.collection('users').doc(user_id).delete();
    console.log(result);
}



// ==============================
//            Auth
// ==============================

const authenticate = async ({email, password}) => {
    //Check for input errors
    const errors = findErrors([
		{name: "email", value: email, regex: /\w+@\w+\.\w+/}, 
        {name: "password", value: _user.password, regex: /^.{6,}$/}
	]);
	if (errors.length) {
		throw errors;
	}
    //Get user by email
    const records = await db.collection('users').where("email", "==", email).get();
    let allUsers = [];
    records.forEach(doc => allUsers.push(doc.data()));
    let user = allUsers[0];
	
    //if passwords match, return user_id and id_admin
    if (user)
        return await verify_hash(user.password, password).then(ok => {
            if (ok) return {user_id: user.user_id, is_admin: user.is_admin};
            else return undefined;
        });
	return undefined;		
}

const checkCredentials = async ({user_id, email}) => {
	const errors = false;
	await dbclient.db('Bello').collection('Users').findOne({"email": email})
		.then(result => {
			if(result && user_id != result.user_id) errors = true;
		});
	return errors;
}


// ==============================
//            Ratings
// ==============================

const createRating = async (user_id, movie_id, rating) => {
    //Make sure user_id and movie_id are strings
    user_id = `${user_id}`;
    movie_id = `${movie_id}`;
    
    
    //validate data
    const errors = findErrors([
        {name: "rating", value: rating, regex: /^[0-5]$/}

    ]);
    if (errors.length) {
        throw errors;
    }

    //create rating
    const result = await db.collection('ratings').doc(`${user_id}m${movie_id}`).set({
        user_id: user_id,
        movie_id: movie_id,
        rating: rating
    });
    console.log(result);
    return result;
}

// createRating("16zb572krkr7mYHmk2FBLj", "557", "3");
// createRating("12d5qUwRS8Njr3pXfgfeyp", "557", "1");
// createRating("12kqra6Rfi6C53KJhCLL5r", "557", "4");

const getAllRatings = async (movie_id) => {
    //Make sure movie_id is a string
    movie_id = `${movie_id}`;

    const ratings = await db.collection('ratings').where("movie_id", "==", movie_id).get();
    let allRatings = [];
    ratings.forEach(doc => allRatings.push(doc.data()));
    return allRatings;
}
// const test = async () => {
//     console.log( await getAllRatings("mivei"));
// }

// test();
// ==============================
//            Reviews
// ==============================

const createReview = async (user_id, movie_id, review) => {
    //Make sure user_id and movie_id are strings
    user_id = `${user_id}`;
    movie_id = `${movie_id}`;
    //validate data
    const errors = findErrors([
        {name: "review", value: review, regex: /^(.{1,250})$/}

    ]);
    if (errors.length) {
        throw errors;
    }

    //generate review id
    const review_id = genId();

    //create review
    const result = await db.collection('reviews').doc(review_id).set({
        review_id: review_id,
        user_id: user_id,
        movie_id: movie_id,
        review: review
    });
    console.log(result);
    return result;
}

// createReview("12d5qUwRS8Njr3pXfgfeyp", "557", "This movie was great!");
// createReview("12kqra6Rfi6C53KJhCLL5r", "557", "This movie kinda sucked!");
// createReview("16zb572krkr7mYHmk2FBLj", "557", "I like Tom Holland better tbh.");

const getReviews = async (movie_id) => {
    //Make sure movie_id is a string
    movie_id = `${movie_id}`;
    //Get all reviews for a movie
    const reviews = await db.collection('reviews').where("movie_id", "==", movie_id).get();
    let allReviews = [];
    reviews.forEach(doc => allReviews.push(doc.data()));
    return allReviews;
}
// const test = async () => {
//     console.log( await getReviews("557"));
// }

// test();


const getReviewById = async (review_id) => {
    //Make sure review_id is a string
    review_id = `${review_id}`;
    //Get review by review_id
    const reviews = await db.collection('reviews').where("review_id", "==", review_id).get();
    let allReviews = [];
    reviews.forEach(doc => allReviews.push(doc.data()));
    return allReviews[0];
}


const deleteReview = async (user_id, is_admin, review_id) => {
    //Make sure user_id, movie_id and review_id are strings
    user_id = `${user_id}`;
    movie_id = `${movie_id}`;
    review_id = `${review_id}`;
    
    //If the request is from an admin
    if(is_admin) {
        const result = await db.collection('reviews').doc(review_id).delete();
        console.log(result);
        return true;
    }
    else {
        let review = await getReviewById(review_id);
        //If user owns the review
        if(review && review.user_id === user_id) {
            const result = await db.collection('reviews').doc(review_id).delete();
            console.log(result);
            return true;
        }
        return false;
    }
}
// const test = async () => {
//     console.log(deleteReview("1", false, "2Hi4hpBX6Qns8Z2yESnjq9"));
// }

// test();


// ==============================
//            Movies
// ==============================



const getMovieById = async (movie_id) => {
    //Make sure movie_id is a string
    movie_id = `${movie_id}`;
    
    //get db data
    let ratings = await getAllRatings(movie_id);
    let reviews = await getReviews(movie_id);
    // console.log(reviews);

    for(let i = 0; i < reviews.length; i++) {
        let user = await getUserById(reviews[i].user_id);
        reviews[i].user = `${user.fname} ${user.lname}`;
    }
    // console.log(reviews);

    //return data
    return {ratings: ratings, reviews: reviews};
}


// const test = async () => {
//     getMovieById("557");
// }

// test();

module.exports =  {
	createUser, getUserById, updatePassword, removeUser,
    authenticate, checkCredentials,
    createRating, getAllRatings,
    createReview, getReviews, deleteReview,
    getMovieById
};