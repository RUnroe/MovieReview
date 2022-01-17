const fetch = require('node-fetch');
const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');

//get movie by id
// const getMovieById = (req, res) => {
// 	dal.getMovieById(req.params.movie_id).then(result => {
// 		res.json(result);
// 	})
// 	.catch(handle(req, res));
// }
const getMovieById = async (req, res) => {
	let dbData = await dal.getMovieById(req.params.movie_id);
	let apiData = await fetch(`https://api.themoviedb.org/3/movie/${req.params.movie_id}?api_key=${require('../../secrets').moviedb.api_key}`);
	apiData = await apiData.json();

	const result = Object.assign(apiData,dbData);
	console.log(result);
	res.json(result);
}

//get movies from search params
//TODO: Get query params and pass through to dal
const getMoviesBySearch = async (req, res) => {
	let page = req.query.page;
	let title = req.query.title;
	let genre = req.query.genre;
	let actor = req.query.actor;
	let result = dal.getMoviesBySearch(page, title, genre, actor);
	res.json(result);
}


//Get collection of movies
const getMovies = async (req, res) => {
	let page = req.query.page ? req.query.page : 1;
	let count = (req.query.count && req.query.count <= 100) ? req.query.count : 20;
	// let result = await dal.getMovies(page, count);

	let movieRange = [(count*(page-1)), ((page*count)-1)]; //Gives lower and upper bound indexes of requested movies (inclusive)
	let firstPage = Math.ceil(movieRange[0]/20); //Api gives 20 results at a time. This calculates what page we need to start gathering from.
	let lastPage =  Math.ceil(movieRange[1]/20); //Determines last page to gather movies from.
	// console.log(movieRange[0], movieRange[1], firstPage, lastPage);
	let result = [];
	for(let i = firstPage; i < (lastPage+1); i++) {
		let apiData = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${require('../../secrets').moviedb.api_key}&language=en-US&page=${i}`);
		apiData = await apiData.json();
		result = result.concat(apiData.results);
	}
	
	//trim off movies that were not requested
	let offset = movieRange[0] - (movieRange[0] % 20);
	// console.log(offset, result.length);
	result = result.slice((movieRange[0] - offset)-1, (movieRange[1]-offset)); //add one to last param bc it is exclusive
	// console.log(result.length);
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
