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
	let dbData = await dal.getMovieById(req.params.movie_id);
	let apiData = await fetch(`https://api.themoviedb.org/3/movie/${req.params.movie_id}?api_key=${require('../../secrets').moviedb.api_key}`);
	apiData = await apiData.json();

	let castData = await fetch(`https://api.themoviedb.org/3/movie/${req.params.movie_id}/credits?api_key=${require('../../secrets').moviedb.api_key}&language=en-US`);
	castData = await castData.json();
	delete castData.id;
	castData.cast = await castData.cast.slice(0, 10);
	castData.crew = await castData.crew.slice(0, 10);

	let result = Object.assign(apiData,dbData);
	result = Object.assign(result, castData);
	// console.log(result);
	res.json(result);
}

//get movies from search params
//TODO: Get query params and pass through to dal
const getMoviesBySearch = async (req, res) => {
	let page = req.query.page;
	let search = req.query.search;

	let genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${require('../../secrets').moviedb.api_key}&language=en-US`);
	genres = await genres.json();

	let searchGenreId = false; 
	genres.genres.forEach(genre => {
		if(search.toLowerCase().includes(genre.name.toLowerCase())) searchGenreId = genre.id;
	})

	let apiData;
	if(searchGenreId) {
		apiData = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${require('../../secrets').moviedb.api_key}&with_genres=${searchGenreId}`)
		apiData = await apiData.json();
	}
	else {
		//TODO: remove TV data. Normalize actor data
		apiData = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${require('../../secrets').moviedb.api_key}&language=en-US&query=${search}&page=${page}`);
		apiData = await apiData.json();

		//expand person known for results
		apiData.results = apiData.results.map(media => {
			if(media.media_type == "person") return [...media.known_for];
			return media;
		});

		apiData.results = [].concat(...apiData.results);

		//remove tv results
		apiData.results = apiData.results.filter(media => media.media_type != "tv");

		
	}

	res.json(apiData);
}


//Get collection of movies
const getMovies = async (req, res) => {
	let page = req.query.page ? req.query.page : 1;
	let count = (req.query.count && req.query.count <= 100) ? req.query.count : 20;
	// console.log(page, count);
	// let result = await dal.getMovies(page, count);

	let movieRange = [(count*(page-1)), ((page*count)-1)]; //Gives lower and upper bound indexes of requested movies (inclusive)
	let firstPage = Math.ceil(movieRange[0]/20) === 0 ? 1 : Math.ceil(movieRange[0]/20); //Api gives 20 results at a time. This calculates what page we need to start gathering from.
	let lastPage =  Math.ceil(movieRange[1]/20); //Determines last page to gather movies from.
	// console.log(movieRange[0], movieRange[1], firstPage, lastPage);
	let result = [];
	for(let i = firstPage; i < (lastPage+1); i++) {
		let apiData = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${require('../../secrets').moviedb.api_key}&language=en-US&page=${i}`);
		apiData = await apiData.json();
		// console.log("loop",i, apiData.results.length);
		result = result.concat(apiData.results);
	}
	// console.log("results", result.length);
	//trim off movies that were not requested
	let offset = movieRange[0] - (movieRange[0] % 20);
	
	result = result.slice(((movieRange[0] - offset) === -1 ? 0 : (movieRange[0] - offset)), (movieRange[1]-offset)+1); //add one to last param bc it is exclusive

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
