const express = require("express");
const router = express.Router();
const fs = require("fs");
// const df = require('../public/user.json')

router.get("/all", (req, res) => {
  const { limit } = req.query;
  console.log(limit);
  fs.readFile("user.json", "utf8", (err, data) => {
    if (limit) {
      res.send(JSON.parse(data).slice(0, limit));
    } else {
      res.send(JSON.parse(data));
    }
  });
});
router.get("/random", (req, res) => {
  fs.readFile("user.json", "utf8", (err, data) => {
    const allUser = JSON.parse(data);
    const randomUser = allUser[Math.floor(Math.random() * allUser.length)];
    res.json(randomUser);
  });
});

router.post("/save", (req, res) => {
  const {id, name, gender, contact, address, photoUrl} = req.body;
  if (!id || !name || !gender || !contact || !address || !photoUrl) {
    res.send("pls provide the valid information");
  } else {
    fs.readFile("user.json", "utf8", (err, data) => {
      const allUser = JSON.parse(data);
      allUser.push(req.body);
      console.log(allUser);
      res.send("success");
    });
  }
});

router.patch('/update/:id', (req, res)=>{
  fs.readFile("user.json", "utf8", (err, data) => {
    const ID = req.params.id
    const allUser = JSON.parse(data);
    const selectedUser = allUser.find(user => user.id === +ID)
    selectedUser.name = req.body.name
    selectedUser.gender = req.body.gender
    selectedUser.contact = req.body.contact
    selectedUser.address = req.body.address

    res.send(selectedUser)
  });
})

router.delete('/delete/:id', (req, res)=>{
  fs.readFile("user.json", "utf8", (err, data) => {
    const ID = req.params.id
    const allUser = JSON.parse(data);
    const selectedUsers = allUser.filter(user => user.id !== +ID)
    res.send(selectedUsers)
  });
})

module.exports = router;
