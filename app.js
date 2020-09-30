const express = require("express");
const exphbs = require("express-handlebars"); //template engine for rendering view

const app = express();
const port = 3000;

//taken from handlebars documentation
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const students = ["vipul", "surbhi", "mohit", "vibhey"];

//middleware for parsing json
app.use(express.json());

//middleware for finding random lunch partners
let lunchPartners = (req, res, next) => {
  let randomNum = Math.floor(Math.random() * students.length);
  let randomNum2 = Math.floor(Math.random() * students.length);

  req.partners = {
    student1: students[randomNum],
    student2: students[randomNum2],
  };
  next();
};

app.get("/", lunchPartners, (req, res) => {
  // res.send("hello World again!");
  res.render("home", req.partners);
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
