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
	let page = req.query.page;
	let title = req.query.title;
	let genre = req.query.genre;
	let actor = req.query.actor;
	dal.getMoviesBySearch(page, title, genre, actor).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}


//Get collection of movies
//TODO: Get query params and pass through to dal
const getMovies = (req, res) => {
	let page = req.query.page;
	let count = req.query.title;
	dal.getMovies(page, count).then(result => {
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
	},
	{
		uri: '/api/movies',
		methods: ['get'],
		handler: getMovies

	}
];


module.exports = { routes, configure };
