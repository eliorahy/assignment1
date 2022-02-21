const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8080;

const users = [{ username: "admin", password: "password" }];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors({ origin: "*" }));

// Here is the API, we send a POST request to the /login route, and it checks if username = admin and password = password
// If true, it sends you to welcome page (another route in client) and if false it gives you alert in red.
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
    // Return response with status 200 and data provided
    res.status(200).send({ status: 200, data: "User logged in successfully" });
  } else {
    // Return response with status 401  and data provided
    res.status(401).send({ status: 401, data: "Wrong credentials" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
