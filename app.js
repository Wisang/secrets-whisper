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

app.post('/register', function(req, res) {
  const newUser = User({
    email: req.body.username,
    password: req.body.password
  });

  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
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
        if (user.password !== req.body.password) {
          res.send('incorrect password');
        } else {
          res.render("secrets");
        }
      } else {
        res.send('user not found');
      }
    }
  });
});

app.listen(3000, function() {
  console.log('Express server listening on port 3000');
});
