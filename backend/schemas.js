// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    getRatings(movie_id: String!): [Rating],
    getReview(movie_id: String!): [Review],
    getMovieById(movie_id: String!): [Movie],
    getMoviesBySearch(search: String!): [Movie],
    getMovies(input: MovieInput): [Movie]
  }

  type Mutation {
    createRating(input: RatingInput): Boolean
    createReview(input: ReviewInput): Int
    deleteReview(review_id: String!): Boolean
  }

  input MovieInput {
    page: Int,
    count: Int
  }

  input RatingInput {
    movie_id: String!,
    api_key: String,
    rating: Int!
  }

  type Rating {
    movie_id: String!,
    user_id: String!,
    rating: Int!
  }

  input ReviewInput {
    movie_id: String!,
    api_key: String,
    review: String!
  }

  type Review {
    movie_id: String!,
    review_id: String!,
    user_id: String!,
    review: String!
  }

  type Collection {
    id: Int,
    name: String,
    poster_path: String,
    backdrop_path: String
  }

  type Genre {
    id: Int,
    name: String
  }

  type ProductionCompany {
    id: Int,
    logo_path: String,
    name: String,
    origin_country: String
  }
  
  type ProductionCountries {
    iso_3166_1: String,
    name: String
  }

  type SpokenLanguage {
    english_name: String,
    iso_639_1: String,
    name: String
  }

  type CastMember {
    adult: Boolean,
    gender: Int,
    id: Int,
    known_for_department: String,
    name: String,
    original_name: String,
    popularity: Int,
    profile_path: String,
    cast_id: Int,
    character: String,
    credit_id: String,
    order: Int
  }

  type CrewMember {
    adult: Boolean,
    gender: Int,
    id: Int,
    known_for_department: String,
    name: String,
    original_name: String,
    popularity: Int,
    profile_path: String,
    credit_id: String,
    department: String,
    job: String
  }


  type Movie {
    adult: Boolean,
    backdrop_path: String,
    belongs_to_collection: Collection,
    budget: Int,
    genres: [Genre],
    homepage: String,
    id: Int,
    imdb_id: String,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Int,
    poster_path: String,
    production_companies: [ProductionCompany],
    production_countries: [ProductionCountries],
    release_date: String,
    revenue: Int,
    runtime: Int,
    spoken_languages: [SpokenLanguage],
    status: String,
    tagline: String,
    title: String,
    video: Boolean,
    vote_average: Float,
    vote_count: Int,
    ratings: [Rating],
    reviews: [Review],
    cast: [CastMember],
    crew: [CrewMember]
  }
`;

    
    
// Provide resolver functions for your schema fields

const resolvers = {
  Query: {
    ratings: (movie_id) => [{movie_id: "1", user_id: "u1", rating: 5}],
  },
};


module.exports = {typeDefs, resolvers};