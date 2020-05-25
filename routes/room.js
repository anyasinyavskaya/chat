const express = require('express');
const roomRouter = express.Router();
const flash = require('connect-flash');

let userController = require("../src/conrollers/UserController");
let roomController = require("../src/conrollers/RoomController");

roomRouter.get('/', function (req, res, next) {
    let user = req.session.user;
    if (!user) {
        res.redirect('/')
    } else {
        let name = req.param('name');
        res.render('chat', {
            users: 'room/getUsers?name=' + name,
            messages: 'room/getMessages?name=' + name,
            send: 'room/send?name=' + name,
            logout: 'room/logout?name=' + name,
            remove: 'room/remove?name=' + name,
            out: 'room/out?name=' + name
        });
    }
    res.end();
});


roomRouter.get('/logout', function (req, res, next) {
    let user = req.session.user;
    console.log("Выход из аккаунта");
    if (user) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });

    }
});

roomRouter.get('/out', function (req, res, next) {
    let user = req.session.user;
    console.log('Выход из чата');
    if (!user) {
        res.redirect('/')
    } else {
        let name = req.param('name');
        roomController.out(user, name, function (done, err, message) {
            if (done) {
                res.redirect('/chat');
                res.end();
            }
        })
    }
});

roomRouter.post('/send', function (req, res, next) {
    let user = req.session.user;
    if (!user) {
        res.redirect('/')
    } else {
        let text = req.param('text');
        let name = req.param('name');
        roomController.addMessage(name, text, user, function (result, err, message) {
            if (!result) {
                console.log(message);
                req.flash('error', message);
                res.render('chat', {
                    users: 'getUsers?name=' + name,
                    messages: 'getMessages?name=' + name,
                    send: 'send?name=' + name,
                    logout: 'logout?name=' + name,
                    remove: 'remove?name=' + name
                }, {expressFlash: req.flash('error')});
            } else {
                if (err) {
                    next(err)
                } else {
                    res.json({message: 'Сообщение отправлено', result});
                    res.end()
                }
            }
        });
    }
});


roomRouter.get('/remove', function (req, res, next) {
    let user = req.session.user;
    if (!user) {
        res.redirect('/')
    }
    let name = req.param('name');
    roomController.remove(user, name, function (done, err, message) {
        if (done) {
            res.redirect('/chat');
            res.end();
        }
    })
});


roomRouter.post('/getMessages', function (req, res, next) {
    let user = req.session.user;
    if (!user) {
        res.redirect('/')
    } else {
        let name = req.param('name');
        roomController.getMessages(name, function (messages, err, message) {
            if (messages) {
                res.send(messages);
                res.end()
            }
        });
    }
});

roomRouter.post('/getUsers', function (req, res, next) {
    let user = req.session.user;
    if (!user) {
        res.redirect('/')
    } else {
        let name = req.param('name');
        roomController.getUsers(name, function (result) {
            res.send(result);
            res.end();
        });
    }
});

module.exports = roomRouter;