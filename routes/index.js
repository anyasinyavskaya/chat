const express = require('express');
const indexRouter = express.Router();
const flash = require('connect-flash');

let userRepository = require("../controllers/repositories/UserRepository");
let roomRepository = require("../controllers/repositories/RoomRepository");

indexRouter.get('/', function (req, res, next) {
    if (req.session.user) {
        res.redirect('/chat')
    } else {
        res.render('index', { expressFlash: req.flash('error')});
    }
    res.end();
});

indexRouter.get('/createAccount', function (req, res, next) {
    res.render('register', { expressFlash: req.flash('error') });
});

indexRouter.post('/register', function (req, res, next) {
    let username = req.param('username');
    let password = req.param('password');
    userRepository.register(username, password, function (user, err, message) {
        if (!user) {
            console.log(message);
            req.flash('error', message);
            res.render('register', { expressFlash: req.flash('error') });
        }  else {
            if (err) {
                next(err)
            } else {
                req.session.user = user;
                res.redirect('/chat');
                res.end()
            }
        }
    })
});

indexRouter.post('/login', function (req, res, next) {
    let username = req.param('username');
    let password = req.param('password');
    userRepository.login(username, password, function (user, err, message) {
        if (!user) {
            console.log(message);
            req.flash('error', message);
            res.render('index', { expressFlash: req.flash('error') });
        } else {
            if (err) {
                next(err)
            } else {
                console.log("Авторизация прошла успешно");
                req.session.user = user;
                console.log(user);
                res.redirect('/chat');
                res.end()
            }
        }
    })
});

module.exports = indexRouter;