//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs');
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');
const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});
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

app.post('/register', function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser = User({
      email: req.body.username,
      password: hash
    });

    newUser.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.render("secrets");
      }
    });
  });
});

app.post('/login', function(req, res) {
  User.findOne({
    email: req.body.username
  }, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (result === false) {
            res.render(err);
          } else {
            res.render("secrets");
          }
        });
      } else {
        res.send('user not found');
      }
    }
  });
});

app.listen(3000, function() {
  console.log('Express server listening on port 3000');
});
