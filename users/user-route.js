const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const Users = require("./user-model");
const { restricted,
  validateFields } = require("../middleware/user-middleware")

router.get("/", restricted, (req, res) => {
  Users.getUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json(err));
});

router.post("/register", validateFields, (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Users.registerUser(user)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json(err));
});

router.post("/login", validateFields, (req, res) => {
  let { username, password } = req.body;

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
