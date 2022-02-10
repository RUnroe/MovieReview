// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    ratings(movie_id: String): [Rating]
  }

  type Mutation {
    rating(input: RatingInput): Rating
  }

  input RatingInput {
    movie_id: String!,
    user_id: String!,
    rating: Int!
  }

  type Rating {
    movie_id: String!,
    user_id: String!,
    rating: Int!
  }
`;

// Provide resolver functions for your schema fields

const resolvers = {
  Query: {
    ratings: (movie_id) => [{movie_id: "1", user_id: "u1", rating: 5}],
  },
};


module.exports = {typeDefs, resolvers};