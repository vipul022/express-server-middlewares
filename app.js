const express = require("express");
const app = express();
const port = 3000;

const students = ["vipul", "surbhi", "mohit"];

//middleware for parsing json
app.use(express.json());

app.get("/", function (req, res) {
  res.send("hello World again!");
});

app.get("/students", function (req, res) {
  res.send(students);
});

// add a student
app.post("/", function (req, res) {
  console.log("req =>", req.body);
  students.push(req.body.name);
  res.send(students);
});

//syntax for attaching middleware to a route
app.post(
  "/students",
  (req, res, next) => {
    console.log("inside middleware");
    next();
  },
  (req, res) => {
    res.send(students);
  }
);

// listen on a specific port
app.listen(port, () => console.log(`listening on port ${port}`));
