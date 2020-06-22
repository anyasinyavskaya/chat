const express = require('express');
const chatRouter = express.Router();
const flash = require('connect-flash');

let userController = require("../src/controllers/UserController");
let roomController = require("../src/controllers/RoomController");

chatRouter.get('/', function (req, res, next) {
    let user = req.session.user;
    if (!user) {
        res.status(401).redirect('/')
    } else {
        res.render('chat-list', {expressFlash: req.flash('error')});
    }
    res.end();
});

chatRouter.post('/create', function (req, res, next) {
    let user = req.session.user;
    if (!user) {
        res.status(401).redirect('/')
    } else {
        let name = req.param('name');
        roomController.create(user, name, function (done, err, message) {
            if (!done) {
                console.log(message);
                req.flash('error', message);
                res.status(403).render('chat-list', {expressFlash: req.flash('error')});
            } else {
                if (err) {
                    next(err)
                } else {
                    res.redirect('/chat/enter?name=' + name);
                    res.end();
                }
            }
        })
    }
});

chatRouter.get('/enter', function (req, res, next) {
    let user = req.session.user;
    if (!user) {
        console.log('Пользователь не найден');
        res.status(401).redirect('/')
    } else {
        let name = req.param('name');
        roomController.get(user, name, function (done, err, message) {
            if (!done) {
                console.log(message);
                req.flash('error', message);
                res.render('chat-list', {expressFlash: req.flash('error')});
            } else {
                if (err) {
                    next(err)
                } else {
                    console.log("Вход в чат произведен");
                    res.redirect('/room?name=' + name);
                    res.end();
                }
            }
        })
    }
});

module.exports = chatRouter;
