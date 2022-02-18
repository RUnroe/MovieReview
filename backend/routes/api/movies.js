const fetch = require('node-fetch');
const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');


// const getMovieById = (req, res) => {
// 	dal.getMovieById(req.params.movie_id).then(result => {
// 		res.json(result);
// 	})
// 	.catch(handle(req, res));
// }

//get movie by id
//TODO: Add actors to movies
const getMovieById = async (req, res) => {
	let result = await dal.getMovieById(req.params.movie_id);
	
	// console.log(result);
	res.json(result);
}

//get movies from search params
//TODO: Get query params and pass through to dal
const getMoviesBySearch = async (req, res) => {
	let page = req.query.page;
	let search = req.query.search;

	let results = await dal.getMoviesBySearch(page, search);


	res.json(results);
}


//Get collection of movies
const getMovies = async (req, res) => {
	let page = req.query.page ? req.query.page : 1;
	let count = (req.query.count && req.query.count <= 100) ? req.query.count : 20;
	// console.log(page, count);
	let result = await dal.getMovies(page, count);

	
	// console.log(result.length);
	// console.log("results1", result.length);
	res.json(result);
}



const routes = [
	{
		uri: '/api/movie/:movie_id',
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
