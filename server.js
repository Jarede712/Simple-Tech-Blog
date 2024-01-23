const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");

const sequelize = require("./config/connection");
const routes = require("./controllers"); // Ensure you have your routes set up in the controllers directory
const helpers = require("./utils/helpers"); // Optional: Include if you have handlebars helpers

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from the 'public' directory

// Set up session with cookies
app.use(
  session({
    secret: "Super secret secret",
    cookie: {
      maxAge: 3600000, // 1 hour cookie lifetime
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Set up routes
app.use(routes);

// Sync sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port http://localhost:${PORT}`)
  );
});
