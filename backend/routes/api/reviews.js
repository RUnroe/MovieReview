const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');

const createReview = (req, res) => {
	if(req.query.api_key) {
		dal.createReviewAPI(req.query.api_key, req.params.movie_id, req.body.review).then((review_id) => {
			res.json(review_id);
		})
		.catch(handle(req, res));
	}
	else {
		dal.createReview(req.session.user_id, req.params.movie_id, req.body.review).then((review_id) => {
			res.json(review_id);
		})
		.catch(handle(req, res));
	}
}
//get all reviews for a movie
const getReviews = (req, res) => {
	dal.getReviews(req.params.movie_id).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}
//Delete a review. Either delete a review you own or admin can delete any review
const deleteReview = (req, res) => {
	if(req.query.api_key) {
		dal.deleteReviewAPI(req.query.api_key, req.params.review_id).then(result => {
			res.json(result);
		})
		.catch(handle(req, res));
	}
	else {
		dal.deleteReview(req.session.user_id, req.session.is_admin, req.params.review_id).then(result => {
			res.json(result);
		})
		.catch(handle(req, res));
	}
}




const routes = [
	{
		uri: '/api/review/:movie_id',
		methods: ['post'],
		handler: [requireAuth(), createReview]
	},
	{
		uri: '/api/review/:movie_id',
		methods: ['get'],
		handler: getReviews
	},
    {
		uri: '/api/review/:review_id',
		methods: ['delete'],
		handler: [requireAuth(), deleteReview]
	}

];


module.exports = { routes, configure };
