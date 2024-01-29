const fs = require("fs");
const express = require("express");
const app = express();

const tour = JSON.parse(
  fs.readFileSync("./4-natours/starter/dev-data/data/tours-simple.json")
);
console.log(tour);
