const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');

const createReview = (req, res) => {
	dal.createReview(req.session.user_id, req.params.movie_id, req.body).then((review_id) => {
		res.json(review_id);
	})
	.catch(handle(req, res));
}
//get all order by order_id
const getReviews = (req, res) => {
	dal.getReviews(req.params.movie_id).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}
//get all orders (purchased) for user by user_id
const deleteReview = (req, res) => {
	dal.deleteReview(req.session.user_id, req.session.is_admin, req.params.movie_id, req.params.review_id).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}




const routes = [
	{
		uri: '/api/:movie_id/review',
		methods: ['post'],
		handler: [requireAuth(), createReview]
	},
	{
		uri: '/api/:movie_id/review',
		methods: ['get'],
		handler: getReviews
	},
    {
		uri: '/api/:movie_id/review/:review_id',
		methods: ['delete'],
		handler: [requireAuth(), deleteReview]
	}

];


module.exports = { routes, configure };
