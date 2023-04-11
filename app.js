const express = require("express")
const port = 3000
const app = express()

app.get("/", (req, res) => {
    res.send("merhaba")
})

app.listen(3000, () => {
    console.log("server başlatıldı cheeeeeeeck")
})