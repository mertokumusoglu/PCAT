const express = require("express")
const ejs = require("ejs")

const port = 3000
const app = express()

app.set("view engine", "ejs")
app.use(express.static('public'));

const path = require("path")

// Middlewares

app.get("/", (req, res) => {
    res.render('index');
  });

app.get("/about", (req, res) => {
    res.render('about')
})

app.get("/add", (req, res) => {
    res.render('add')
})

app.listen(3000, () => {
    console.log("sunucu baslatildi 1")
})