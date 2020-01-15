const express = require('express');
const bcrypt = require("bcryptjs");

const router = express.Router();

const Users = require("./user-model");

router.get("/", restricted, (req, res) => {
    Users.getUsers()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err))
})

router.post("/register", (req, res) => {

})

router.post("/login", (req, res) => {
    let { username, password } = req.body;


    Users.findBy({username})
    .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!` });
              } else {
                res.status(401).json({ message: "Invalid Credentials" });
              }
        })
        .catch(error => {
            res.status(500).json("error");
        });
})

function restricted(req, res, next) {
    const { username, password } = req.headers;
  
    if (username && password) {
      Users.findBy({username})
        .first()
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            next();
          } else {
            res.status(401).json({ message: 'Invalid Credentials' });
          }
        })
        .catch(error => {
          res.status(500).json({ message: 'Unexpected error' });
        });
    } else {
      res.status(400).json({ message: 'No credentials provided' });
    }
  } 

module.exports = router;