const Users = require("../users/user-model");
const bcrypt = require("bcryptjs");

function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Unexpected error" });
      });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

function validateFields(req, res, next) {
  let { username, password } = req.body || req.headers;
  if (!username || !password) {
    res.status(400).json({ error: "Request needs username and passwords" });
  } else {
    next();
  }
}

module.exports = {
    restricted,
    validateFields
}