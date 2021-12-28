const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Defining Paths for express configuration and setting handlebars with view location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sarim Sikander",
    footer: "Index footer",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Sarim Sikander",
    footer: "About footer",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Help text",
    title: "It is the help page!",
    name: "Sarim Sikander",
    footer: "Help footer",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Pleae provide an  address!",
    });
  }
  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        forecast: forecastData,
        Address: address,
        location: location,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help 404",
    name: "Sarim Sikander",
    errormessage: "Help 404 Not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sarim Sikander",
    errormessage: "Page Not found!",
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000.");
});
