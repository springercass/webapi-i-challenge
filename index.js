// implement your API here
const express = require("express");
const Users = require("./data/db.js");

const server = express();
server.use(express.json());

const port = 5000;
server.listen(port, () => {
  console.log(`\n** API up and running on ${port} **`);
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Users.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database."
        });
      });
  }
});
