require('dotenv').config();
const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const { auth } = require('express-openid-connect');
const db = require('cyclic-dynamodb')

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())


const config = {
  authRequired: false,
  auth0Logout: true
};

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(async function (req, res, next) {
  res.locals.user = req.oidc.user;
  //res.locals.user = new User(req.oidc.user);
  //res.locals.strava = new Strava(typeof req.oidc.user === 'undefined' ? undefined : req.oidc.user.sub)
  await res.locals.strava.load();
  next();
});

app.use('/', require('./routes/indexRoutes'));
app.use('/db', require('./routes/dbRoutes'));
app.use('/user', require('./routes/userRoutes'));


// Catch all handler for all other request.
app.use('*', (req, res) => {
  res.json({ msg: 'no route handler found' }).end()
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
