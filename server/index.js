const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const FriendModel = require("./models/Friends");

app.use(express.json());
app.use(cors());

// standard you can just change the :27017/food and add you route//
mongoose.connect(
  "mongodb://localhost:27017/tutorial",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Mongodb connected");
    else console.log("Connection error :" + err);
  }
);
////////// POST DATA /////////////
app.post("/addfriend", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  const friendSave = new FriendModel({ name: name, age: age });
  await friendSave.save();
  res.send(friendSave);
});
/////// READ DATA /////////
app.get("/read", async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});
//////// UPDATE DATA //////////////
app.put("/update", async (req, res) => {
  const newAge = req.body.newAge;
  const id = req.body.id;
  console.log(newAge, id);
  try {
    await FriendModel.findById(id, (err, friendToUpdate) => {
      if (err) {
        console.error("error, no entry found");
        return;
      }
      friendToUpdate.age = Number(newAge);
      friendToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }
  res.send("update");
});
///////////////////////////: DETELE DATA ///////////////////
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await FriendModel.findByIdAndRemove(id).exec();
  res.send("item deleted");
});
/////////// LISTEN PORT ////////
app.listen(3001, () => {
  console.log("server running on port 3001");
});
