const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireAdmin, requireNotAuth, handle } = require('../util');

const createUser = (req, res) => {
	dal.createUser(req.body)
		.then(({user_id, is_admin}) => {
			req.session.user_id = user_id.toString(); // log them in
			req.session.is_admin = is_admin.toString(); // log them in
			console.log("session created");
			//res.header('Location', '/api/auth');
			res.status(201);
			res.statusMessage = 'Created User';
			res.end();
		})
		.catch(handle(req, res));
}

// Authenticate the user by assigning them a session/cookie
const authenticate = (req, res, next) => {
	dal.authenticate({identifier: req.body.identifier, password: req.body.password})
		.then((value) => {
			if(value === undefined || value === null) {
				res.status(401).end();
				return;
			}
			if (value.user_id) {
				req.session.user_id = value.user_id;
				req.session.is_admin = value.is_admin.toString(); // log them in

				console.log("session created");
				res.statusMessage = 'Authenticated';
				res.status(200).end();
				return;
			}
			res.status(401).end();
			return;
		})
		.catch(err => {console.log(err); return handle(req, res);});
};


const endSession = (req, res) => {
	req.session.destroy();
	res.status(204);
	res.statusMessage = 'Logged out';
	res.end();
};

const getUser = (req, res) => {
    dal.getUserById({user_id: req.params.user_id}).then( user => {
		res.json(user);
	})
	.catch(handle(req, res));
}

const updateUser = (req, res) => {
	dal.updateUser(req.session.user_id, req.body).then(() => {
		res.status(204);
		res.statusMessage = 'Updated User';
		res.end();
	})
	.catch(handle(req, res));

}

const removeSelf = (req, res) => {
	dal.removeUser(req.session.user_id, req.body).then(() => {
		res.status(204);
		res.statusMessage = 'Removed User';
		res.end();
	})
	.catch(handle(req, res));
}

const removeUser = (req, res) => {
	dal.removeUser(req.body.user_id, req.body).then(() => {
		res.status(204);
		res.statusMessage = 'Removed User';
		res.end();
	})
	.catch(handle(req, res));
}





const routes = [
	{
		uri: '/api/user',
		methods: ['post'],
		handler: createUser
	},
    {
		uri: '/api/user/:user_id',
		methods: ['get'],
		handler: getUser
	},
    {
		uri: '/api/user',
		methods: ['put'],
		handler: [requireAuth(), updateUser]
	}, 
    {
		uri: '/api/user',
		methods: ['delete'],
		handler: [requireAuth(), removeSelf]
	},
    {
		uri: '/api/user/:user_id',
		methods: ['delete'],
		handler: [requireAdmin(), removeUser]
	},

	{
		uri: '/api/auth',
		methods: ['post'],
		handler: authenticate
	},
	{
		uri: '/api/auth',
		methods: ['delete'],
		handler: [requireAuth(), endSession]
	}

];


module.exports = { routes, configure };