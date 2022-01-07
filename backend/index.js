const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');


const app = express();
const dal = require('./db/dal');


app.set("trust proxy", 1);
app.use(express.static(path.join(__dirname + "/public")));


app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library


let routeFiles = ['api/reviews', 'api/users', 'api/ratings', 'api/movies'];
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
        let component = require(`./routes/${file}`);
        if (component.configure) component.configure({
                dal, upload
        });
        routeManager.apply(app, component);
});



app.listen(3005, "localhost");