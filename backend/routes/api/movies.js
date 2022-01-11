const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');

//get movie by id
const getMovieById = (req, res) => {
	dal.getMovieById(req.params.movie_id).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}

//get movies from search params
//TODO: Get query params and pass through to dal
const getMoviesBySearch = (req, res) => {
	dal.getMoviesBySearch().then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}




const routes = [
	{
		uri: '/api/:movie_id',
		methods: ['get'],
		handler: getMovieById
	},
    {
		uri: '/api/search',
		methods: ['get'],
		handler: getMoviesBySearch
	}
];


module.exports = { routes, configure };
