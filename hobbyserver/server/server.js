// import dependencies and initialize express
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./routes/users');
const filesRouter = require('./routes/files');

const app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

mongoose.connect(process.env.DBCONN, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/files', filesRouter);

app.all('', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
  console.log(`Swagger UI available http://localhost:${port}/swagger/api-docs`);
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = app;
