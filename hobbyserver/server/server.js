// import dependencies and initialize express
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const healthRoutes = require('./routes/health-route');
const swaggerRoutes = require('./routes/swagger-route');
const usersRouter = require('./routes/users');

const app = express();

mongoose.connect(process.env.DBCONN, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// routes and api calls
app.use('/users', usersRouter);

// default path to serve up index.html (single page application)
app.all('', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
});

// start node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
  console.log(`Swagger UI available http://localhost:${port}/swagger/api-docs`);
});

// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = app;
