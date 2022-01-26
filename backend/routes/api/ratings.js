const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');

const createRating = (req, res) => {
	if(req.query.api_key) {
		dal.createRatingAPI(req.query.api_key, req.params.movie_id, req.body.rating).then((success) => {
			if(success) res.sendStatus(200);
			else res.sendStatus(401);
		})
		.catch(handle(req, res));
	}
	else {
		dal.createRating(req.session.user_id, req.params.movie_id, req.body.rating).then((success) => {
			if(success) res.sendStatus(200);
			else res.sendStatus(401);
		})
		.catch(handle(req, res));
	}
}
//get all ratings by for a movie
const getRatings = (req, res) => {
	dal.getAllRatings(req.params.movie_id).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}




const routes = [
	{
		uri: '/api/rating/:movie_id',
		methods: ['post'],
		handler: [requireAuth(), createRating]
	},
	{
		uri: '/api/rating/:movie_id',
		methods: ['get'],
		handler: getRatings
	}
];


module.exports = { routes, configure };
