let Map = require("collections/map");
let Users = require("../models/UserModel");


module.exports = {
    register: function (username, password, callback) {
        Users.findOne({
            username: username,
            password: password
        })
            .exec(function (err, user) {
                if (user) {
                    callback(false, null, 'Такой логин уже используется');
                }
                else {
                    Users.create({
                        username: username,
                        password: password
                    })
                        .then(function (err, user) {
                            callback(user, err, 'Пользователь зарегистрирован')
                        });
                }
            });
    },

    login: function (username, password, callback) {
        Users.findOne({
            username: username,
            password: password
        }).exec(function (err, user) {
            if (!user) {
                callback (false, null, 'Неверный логин или пароль')
            }
            callback(user, err, 'Выполнен вход в аккаунт')
        });
    }

};
