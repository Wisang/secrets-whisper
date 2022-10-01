//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = {
  email: String,
  password: String
};

const User = mongoose.model('User', userSchema);

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.render("home");
});

app.get('/login', function(req, res) {
  res.render("login");
});

app.get('/register', function(req, res) {
  res.render("register");
});

app.listen(3000, function() {
  console.log('Express server listening on port 3000');
});
