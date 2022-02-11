// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    ratings(movie_id: String)!: [Rating],
    review(movie_id: String!): [Review]
  }

  type Mutation {
    createRating(input: RatingInput): Boolean
    createReview(input: ReviewInput): Int
    deleteReview(review_id: String!): Boolean
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
`;

// Provide resolver functions for your schema fields

const resolvers = {
  Query: {
    ratings: (movie_id) => [{movie_id: "1", user_id: "u1", rating: 5}],
  },
};


module.exports = {typeDefs, resolvers};