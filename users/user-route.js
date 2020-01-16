const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const Users = require("./user-model");
const { restricted, validateFields, protected } = require("../middleware/user-middleware");

router.get("/", protected, (req, res) => {
  Users.getUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json(err));
});

router.get("/test", (req, res) => {
  const name = req.session.name;
  
  res.send(name);
});

router.get("/logout", (req, res) => {
  if(req.session){
    req.session.destroy(err => {
      if(err){
        res.send(err)
      } else {
        res.send("Goodbye!")
      }
    })
  }
})

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Users.registerUser(user)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json(err));
});

router.post("/login", validateFields, (req, res) => {
  let { username, password } = req.headers;
  req.session.name = 'testing'

  Users.findBy({ username })
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
});

module.exports = router;
