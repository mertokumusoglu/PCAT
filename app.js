const express = require("express");
const ejs = require("ejs");
const fileUpload = require("express-fileupload")
const methodOverride = require('method-override');
const path = require("path");
const fs = require("fs")
const mongoose = require("mongoose");
const Photo = require("./models/Photo");
const port = 3000;
const app = express();
const photoController = require("./controllers/photoController")
const pageController = require("./controllers/pageController")

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
app.use(fileUpload());
app.use(methodOverride('_method', {
  methods: ["POST", "GET"]
}));

// ROUTES
app.get("/", photoController.getAllPhotos);
app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPage);

// ROUTES - CRUD
app.get("/photos/edit/:id", pageController.getEditPage)
app.get("/photos/:id", photoController.getPhoto);
app.put("/photos/:id", photoController.updatePhoto)
app.delete("/photos/:id", photoController.deletePhoto)
app.post("/photos", photoController.createPhoto);


app.listen(3000, () => {
  console.log("sunucu baslatildi 1");
});