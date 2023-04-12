const express = require("express")
const port = 3000
const app = express()
app.use(express.static('public'));
const path = require("path")
// Middlewares

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "temp/index.html"))
})

app.listen(3000, () => {
    console.log("sunucu baslatildi 1")
})