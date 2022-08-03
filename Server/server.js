// START of template

var express = require("express");
var fs = require("fs");
var app = express();
var bodyParser = require("body-parser");
const { STATUS_CODES } = require("http");
var port = 9987;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//END of template

function random() {
  return Math.round(Math.random()) % 2;
}

app.listen(port, function () {
  console.log(`Example app listening on port http://localhost:${port}/`);
});
app.post("/form", function (req, resp) {
  let body = req.body;
  let randomBool = random();
  let jsonRand = JSON.stringify(randomBool);
  resp.send(jsonRand);
});
