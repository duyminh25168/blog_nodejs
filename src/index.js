const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
var methodOverride = require("method-override");
const route = require("./routes");
const sortMiddleware = require("./app/middlewares/sortMiddleware");
const helperHandlebars = require("./helpers/helperHandlebars");
const db = require("./config/db");
const app = express();

const port = 3000;

// connect to db
db.connect();

app.use(morgan("combined"));

app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(sortMiddleware);

app.engine(
    ".hbs",
    engine({
        extname: ".hbs",
        helpers: helperHandlebars,
    })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources/views"));

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
