const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8080;

const users = [{ username: "admin", password: "password" }];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors({ origin: "*" }));
app.post("/login", (req, res) => {
  const userDetails = {
    username: req.body.username,
    password: req.body.password,
  };
  if (
    users.find(
      (eachUser) =>
        eachUser.username === userDetails.username &&
        eachUser.password === userDetails.password
    )
  ) {
    res.status(200).send({ status: 200, data: "User logged in successfully" });
  } else {
    res.status(401).send({ status: 401, data: "Wrong credentials" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
