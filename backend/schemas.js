// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    getRatings(movie_id: String): [Rating]
    getReviews(movie_id: String): [Review]
    getMovieById(movie_id: String): Movie
    getMoviesBySearch(search: String): [Movie]
    getMovies(input: MovieInput): [Movie]
    getUser(user_id: String): User
    getCredentials: User
  }

  type Mutation {
    createRating(input: RatingInput): Boolean
    createReview(input: ReviewInput): Int
    deleteReview(input: DeleteReviewInput): Boolean
    createUser(input: UserInput): UserCredentials
    updatePassword(password: String): Boolean
    removeUser(user_id: String): Boolean
    authenticate(input: AuthInput): UserCredentials
    endSession: Boolean

  }

  input DeleteReviewInput {
    api_key: String
    review_id: String
  }

  input AuthInput {
    email: String
    password: String
  }

  input MovieInput {
    page: Int
    count: Int
  }

  input RatingInput {
    movie_id: String!
    api_key: String
    rating: Int!
  }

  type Rating {
    movie_id: String!
    user_id: String!
    rating: Int!
  }

  input ReviewInput {
    movie_id: String!
    api_key: String
    review: String!
  }

  type Review {
    movie_id: String!
    review_id: String!
    user_id: String!
    review: String!
  }

  input UserInput {
    email: String!
    phone: String!
    fname: String!
    lname: String!
    street: String!
    city: String!
    state: String!
    zip_code: String!
    password: String!
  }

  type UserCredentials {
    user_id: String
    is_admin: Boolean
  }

  type User {
    email: String
    phone: String
    fname: String
    lname: String
    street: String
    city: String
    state: String
    zip_code: String
    is_admin: Boolean
    api_key: String
    user_id: String
  }


  type Crew {
    adult: Boolean
    gender: Int
    id: Int
    known_for_department: String
    name: String
    original_name: String
    popularity: Float
    profile_path: String
    credit_id: String
    department: String
    job: String
  }
  
  type Cast {
    adult: Boolean
    gender: Int
    id: Int
    known_for_department: String
    name: String
    original_name: String
    popularity: Float
    profile_path: String
    cast_id: Int
    character: String
    credit_id: String
    order: Int
  }
  
  type Reviews {
    review: String
    user_id: String
    review_id: String
    movie_id: String
    user: String
  }
  
  type Ratings {
    user_id: String
    movie_id: String
    rating: Int
  }
  
  type SpokenLanguages {
    english_name: String
    iso_639_1: String
    name: String
  }
  
  type ProductionCountries {
    iso_3166_1: String
    name: String
  }
  
  type ProductionCompanies {
    id: Int
    logo_path: String
    name: String
    origin_country: String
  }
  
  type Genres {
    id: Int
    name: String
  }
  
  type BelongsToCollection {
    id: Int
    name: String
    poster_path: String
    backdrop_path: String
  }
  
  type Movie {
    adult: Boolean
    backdrop_path: String
    budget: Int
    homepage: String
    id: Int
    imdb_id: String
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    release_date: String
    revenue: Int
    runtime: Int
    status: String
    tagline: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
    crew: [Crew]
    cast: [Cast]
    reviews: [Reviews]
    ratings: [Ratings]
    spoken_languages: [SpokenLanguages]
    production_countries: [ProductionCountries]
    production_companies: [ProductionCompanies]
    genres: [Genres]
    belongs_to_collection: BelongsToCollection
  }
`;
        

    
const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj);

};   
    
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getRatings: async (parent, {movie_id}) => {
        return await dal.getAllRatings(movie_id);
    },
    getReviews: async (parent, {movie_id}) => {
        return await dal.getReviews(movie_id);
    },
    getMovieById: async (parent, {movie_id}) => {
        return await dal.getMovieById(movie_id);
    },
    getMoviesBySearch: async (parent, {page, search}) => {
        return await dal.getMoviesBySearch(page, search);
    },
    getMovies: async (parent, {page, count}) => {
        return await dal.getMovies(page ? page : 1, count && count <=100 ? count : 20);
    },
    getUser: async (parent, {user_id}) => {
        return await dal.getUserById(user_id);
    },
    getCredentials: async (parent, {}, {session}) => {
        if(session && session.user_id) return await dal.getUserById(session.user_id);
        return null;
    }
  },
  Mutation: {
    createRating: async (parent, {input}, {session}) => {
      console.log(input.api_key, input.movie_id, input.rating);
        if(input.api_key) return await !!dal.createRatingAPI(input.api_key, input.movie_id, input.rating);
        else return await (!!dal.createRating(session.user_id, input.movie_id, input.rating));
    },
    createReview: async (parent, {input}, {session}) => {
        if(input.api_key) return await dal.createReviewAPI(input.api_key, input.movie_id, input.review);
        else return await (dal.createReview(session.user_id, input.movie_id, input.review));
    },
    deleteReview: async (parent, {input}, {session}) => {
      if(input.api_key) return await !!dal.deleteReviewAPI(input.api_key, input.review_id);
      else return await !!dal.deleteReview(session.user_id, session.is_admin, input.review_id);
    },
    createUser: async (parent, user, {session}) => {
      const credentials = await dal.createUser(user);
      //Add credentials to session
      session.user_id = credentials.user_id;
      session.is_admin = credentials.is_admin;
      return credentials;
      // user_id: String
      // is_admin: Boolean
    },
    updatePassword: async (parent, {password}, {session}) => {
      return await !!dal.updatePassword(session.user_id, password);
    },
    removeUser: async (parent, {user_id}, {session}) => {
      return await !!dal.removeUser(user_id);
    },
    authenticate: async (parent, credentials) => {
      return await dal.authenticate(credentials);
    }, 
    endSession: async (parent, args) => {
      req.session.destroy();
      return req.session.user_id === "";
    } 

  }
};


module.exports = {typeDefs, resolvers, configure};