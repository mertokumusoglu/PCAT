const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const Photo = require("./models/Photo");

const port = 3000;
const app = express();

// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/test-pcat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Template Engine
app.set("view engine", "ejs");

// Middlewares

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get("/", async (req, res) => {
  const photos = await Photo.find({})
  res.render("index", { photos });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});
// create object for db
app.post("/photos", async (req, res) => {
  await Photo.create(req.body);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("sunucu baslatildi 1");
});
