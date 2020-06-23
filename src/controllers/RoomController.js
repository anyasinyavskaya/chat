let Room = require("../models/RoomModel");
let Messages = require("../models/MessageModel");
let rooms = require("../models/RoomModel");
let Users = require("../models/UserModel");

function isValidMsg(msg) {
    return (!!msg && typeof msg === "string" && msg.length < 1000);
}

function isValidRoomName(name) {
    return (!!name && typeof name === "string" && name.length < 30);
}

module.exports = {

    isValidMsg,

    isValidRoomName,

    create: function (user, name, callback) {
        //console.log(user._id);
        rooms.findOne({
            name: name,
        }).exec(function (err, room) {
            if (room) {
                callback(false, null, 'Чат уже существует')
            }
            else {
                if (!isValidRoomName(name)) callback(false, err, 'Неверный формат названия');
                else {
                    console.log(user);
                    let newRoom = new rooms({
                        name: name,
                        owner: user._id,
                        users: [user._id],
                    });
                    newRoom.save(function (err) {
                        if (err) return handleError(err);
                    });
                    console.log("Новый чат", newRoom);
                    callback(true, err, 'Создан новый чат')
                }
            }
        });
    },

    remove: function (user, name, callback) {
        rooms.findOne({
            name: name,
        }).exec(function (err, room) {
            if (!room) {
                callback(false, null, 'Чата не существует')
            }
            else {
                room.remove();
                callback(true, err, '')
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
                if (!isValidMsg(text)) callback(false, err, 'Неверный формат сообщения');
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
                if (!room) {
                    callback(false, null, 'Чата не существует')
                }
                else {
                    callback(room.messages, err, 'Ок')
                }
            });
    },
    getUsers: function (name, callback) {
        rooms.findOne({
            name: name,
        })
            .populate('users')
            .exec(function (err, room) {
                if (!room) {
                    callback(false, null, 'Чата не существует')
                }
                else {
                    callback(room.users, err, 'Ок');
                    /*room.users.forEach(function (item, i, arr) {
                        if (item) result += '<div></div><a href="/ban?name=' + room.name + '&username=' + item.username + '">' +
                            '<h4>' + item + '</h4></a><div>';
                    });*/
                }
                //callback(result)
            });
    }
};
