const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// App gneral variables
const authorName = "Zachariah";

//App
app.get("", (req, res) => {
    res.render("index", {
        title: "The Index!!!",
        authorName
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me, I guess",
        authorName
    });
});

app.get("/help", (req, res) => {
    res.send("There is no help.");
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send("Address is required!");
    }
    
    res.send({
        forecast: "",
        location: "",
        address: req.query.address
    });
});

// 404 Pages
app.get("/help/*", (req, res) => {
    res.render("404", {
        message: "There is never help.",
        authorName
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        message: "404 - Page Not Found",
        authorName
    });
});
app.listen(3000, () => {
    console.log("Server started on port 3000 from " + __dirname);
});