const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const flash = require('connect-flash');


let session = require('express-session');
let context = require('request-context');

let indexRouter = require('./routes/index');
let chatRouter = require('./routes/chat');
let roomRouter = require('./routes/room');

let app = express();
let port = 3005;
let dbUrl =
    "mongodb+srv://anya:1999@cluster0-e7hyh.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(dbUrl, {useNewUrlParser: true}, () => {
    console.log("Mongo DB is connected")
}).catch(err => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/room', roomRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use((req, res, next) => {
    res.locals.expressFlash = req.flash();
    next();
});

app.listen(port);
console.log('Server started on port localhost:', port);

module.exports = app;
