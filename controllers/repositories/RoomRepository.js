let Room = require("../models/RoomModel");
let Messages = require("../models/MessageModel");
let rooms = require("../models/RoomModel");
let Users = require("../models/UserModel");

module.exports = {

    create: function (user, name, callback) {
        console.log(user._id);
        rooms.findOne({
            name: name,
        }).exec(function (err, room) {
            console.log("Ехес");
            if (room) {
                callback(false, null, 'Чат уже существует')
            }
            else {
                console.log(user);
                rooms.create({
                    name: name,
                    owner: user._id,
                    users: [user._id],
                }).then(function (err, name) {
                    callback(true, err, 'Создан новый чат')
                });
            }
        });
    },

    remove: function (user, name, callback) {
        rooms.findOne({
            name: name,
        }).populate('owner')
            .exec(function (err, room) {
            if (!room) {
                callback(false, null, 'Чата не существует')
            }
            else {
                if (room.owner === user._id) {
                    rooms.remove({name: name});
                    callback(true, err, '')
                } else callback(false, err, 'Вы не создатель')
            }
        });
    },

    addMessage: function (name, text, user, callback) {
        rooms.findOne({
            name: name,
        }).exec(function (err, room) {
            if (!room) {
                callback(false, null, "Чата не существует");
            }
            else {
                let newMessage = new Messages({
                    text: text,
                    sendBy: user._id,
                });
                newMessage.save(function (err) {
                    if (err) return handleError(err);
                });
                room.messages.push(newMessage._id);
                room.save();
                console.log("Сообщение в БД", room.messages.length);
                callback(newMessage, err, 'Сообщение отправлено');
            }
        })
    },

    get: function (user, name, callback) {
        console.log(user);
        rooms.findOne({
            name: name,
        }).exec(function (err, room) {
            if (!room) {
                callback(false, null, 'Чата не существует');
            } else {
                let hasUser = room.users.find(user._id);
                console.log(hasUser);
                if (hasUser < 0) {
                    room.users.push(user._id);
                    room.save();
                } else console.log('Пользователь уже был в чате');
                console.log(room);
                callback(name, err, 'Выполнен вход в чат')
            }

        });
    },

    out: function (user, name, callback) {
        rooms.findOne({
            name: name,
        }).exec(function (err, room) {
            if (!room) {
                callback(false, null, 'Чата не существует')
            } else {
                let i = room.users.indexOf(user._id);
                room.users.splice(i, 1);
                callback(true, err, 'Выполнен выход из чата')
            }

        });
    },

    getMessages: function (name, callback) {
        rooms.findOne({
            name: name,
        }).populate('messages')
            .populate({path: 'messages', populate: {path: 'sendBy'}})
            .exec(function (err, room) {
                let result = '';
                if (!room) {
                    callback(false, null, 'Чата не существует')
                }
                else {
                    console.log(room.messages.length);
                    console.log(room.users.length);
                    console.log(room.messages[0].sendBy);
                    room.messages.forEach(function (item, i, arr) {
                        result += '<dt>' + item.sendBy.username + '</dt>';
                        result += '<dd>' + item.text + '</dd>';
                    });
                }
                callback(result, err, 'Ок')
            });
    },

    getUsers: function (name, callback) {
        rooms.findOne({
            name: name,
        })
            .populate('users')
            .exec(function (err, room) {
            let result = '';
            if (!room) {
                console.log("Чата не существует");
                throw err;
            }
            else {
                room.users.forEach(function (item, i, arr) {
                    if (item) result += '<div></div><a href="/ban?name=' + room.name + '&username=' + item.username + '">' +
                        '<h4>' + item + '</h4></a><div>';
                });
            }
            callback(result)
        });
    }
};
