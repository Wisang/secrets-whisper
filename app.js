//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send("<h1>Working?</h1>");
});

app.listen(3000, function() {
  console.log('Express server listening on port 3000');
});
