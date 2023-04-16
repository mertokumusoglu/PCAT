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
app.get("/", async (req, res) => {
  const photos = await Photo.find({}).sort("-dateCreated");
  res.render("index", { photos });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/photos/edit/:id", async (req, res) => {
  const photo = await Photo.findOne({_id: req.params.id});
  res.render("edit", {photo})
})

app.get("/photos/:id", async (req, res) => {
  // console.log(req.params.id)
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo,
  });
});

app.put("/photos/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id} );
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save()
  
  res.redirect(`${req.params.id}`) 
})

app.delete("/photos/:id", async (req, res) => {
  const photo = await Photo.findOne({_id: req.params.id});
  let deletedImage = __dirname + "/public/" + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect("/");
})

// create object for db with image
app.post("/photos", async (req, res) => {

  const uploadDir = "public/photos";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
  }
  let uploadedImage = req.files.image
  let uploadPath = __dirname + "/public/photos/" + uploadedImage.name

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/photos/" + uploadedImage.name
    });
    res.redirect("/")
  });
});


app.listen(3000, () => {
  console.log("sunucu baslatildi 1");
});