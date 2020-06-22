const express = require('express');
const indexRouter = express.Router();
const flash = require('connect-flash');

let userController = require("../src/controllers/UserController");
let roomController = require("../src/controllers/RoomController");

indexRouter.get('/', function (req, res, next) {
    if (req.session.user) {
        res.redirect('/chat')
    } else {
        res.status(401).render('index', {expressFlash: req.flash('error')});
    }
    res.end();
});

indexRouter.get('/createAccount', function (req, res, next) {
    res.render('register', {expressFlash: req.flash('error')});
});

indexRouter.post('/register', function (req, res, next) {
    let username = req.param('username');
    let password = req.param('password');
    if (username && password) {
        userController.register(username, password, function (user, err, message) {
            if (!user) {
                console.log(message);
                req.flash('error', message);
                res.status(403).send({error: message});
                //res.status(403).render('register', {expressFlash: req.flash('error'), error: message});
            } else {
                if (err) {
                    next(err)
                } else {
                    req.session.user = user;
                    res.redirect('/chat',201);
                    res.end()
                }
            }
        })

    } else {
        let message = "Введите логин и пароль";
        req.flash('error', message);
        res.status(422).render('register', {expressFlash: req.flash('error'), error: message});
    }
});

indexRouter.post('/login', function (req, res, next) {
    let username = req.param('username');
    let password = req.param('password');
    if (username && password) {
        userController.login(username, password, function (user, err, message) {
            if (!user) {
                console.log(message);
                req.flash('error', message);
                res.status(401).render('index', {expressFlash: req.flash('error'), error: message});
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
    } else {
        let message = "Необходимо ввести логин и пароль";
        req.flash('error', message);
        res.send({error:message});

        //res.status(422).render('register', {expressFlash: req.flash('error'), error: message});
    }

});

module.exports = indexRouter;