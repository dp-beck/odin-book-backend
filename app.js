const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_CONNECTION_STRING;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB, { dbName: 'odin-book' });
    console.log('connected to mongodb');
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);

module.exports = app;
