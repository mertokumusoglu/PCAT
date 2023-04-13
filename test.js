const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model("Photo", PhotoSchema);
/*
Photo.create({
  title: "Photo Title 2",
  description: "Photo description 2 lorem ipsum"
}); */
/*
Photo.find({})
.then(data => console.log(data))
*/
/*
const filter = {description: "Photo description 1 lorem ipsum"};

Photo.findOneAndUpdate({title: "Photo Title 1"}, {title: "ata"}, {
  new: true
})
Photo.find(filter).then(
  data => console.log(data)
) */
const id = "64387fbd5a179d01c6319791";
Photo.findByIdAndUpdate(
  id,
  {
    title: "Photo Title 112 updated",
    description: "Photo description 112 updated",
  },
  { new: true }
).then((data) => console.log(data));
