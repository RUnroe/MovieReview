const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

//////////////////
// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

///////////////////

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
// server.start();
// server.applyMiddleware({ app });
const dal = require('./db/dal');


app.set("trust proxy", 1);
app.use(express.static(path.join(__dirname + "/public")));


const corsOptions = {
    origin:  ['http://localhost:3000', 'http://localhost:3001', 'http://192.168.1.101:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Set-Cookie",
    exposedHeaders: "Set-Cookie"
  }
app.use(cors(corsOptions));


app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library



app.use(session({
    secret: require('./secrets').session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30//,
            // sameSite: 'lax',
            // secure: 'auto',
            // httpOnly: false
    }
}));




let routeFiles = ['api/reviews', 'api/users', 'api/ratings', 'api/movies'];
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
        let component = require(`./routes/${file}`);
        if (component.configure) component.configure({
                dal
        });
        routeManager.apply(app, component);
});

server.start().then(res => {
        server.applyMiddleware({ app });
        app.listen({ port: 3005 }, () =>
            console.log('Now browse to http://localhost:3005' + server.graphqlPath)
        )
       })
// app.listen(3005, "localhost");