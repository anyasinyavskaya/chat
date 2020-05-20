const express = require('express');
const chatRouter = express.Router();
const flash = require('connect-flash');

let userRepository = require("../controllers/repositories/UserRepository");
let roomRepository = require("../controllers/repositories/RoomRepository");

chatRouter.get('/', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/')
    } else {
        res.render('chat-list', { expressFlash: req.flash('error')});
    }
    res.end();
});

chatRouter.post('/create', function (req, res, next) {
    let user = req.session.user;
    if (!user) {
        res.redirect('/')
    }
    let name = req.param('name');
    roomRepository.create(user, name, function (done, err, message) {
        if (!done){
            console.log(message);
            req.flash('error', message);
            res.render('chat-list', { expressFlash: req.flash('error') });
        } else {
            if (err) {
                next(err)
            } else {
                res.redirect('/chat/enter?name=' + name);
                res.end();
            }
        }
    })
});

chatRouter.get('/enter', function (req, res, next) {
    let user = req.session.user;
    if (!user) {
        res.redirect('/')
    }
    let name = req.param('name');
    roomRepository.get(user, name, function (done, err, message) {
        if (!done){
            console.log(message);
            req.flash('error', message);
            res.render('chat-list', { expressFlash: req.flash('error') });
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
});

module.exports = chatRouter;
