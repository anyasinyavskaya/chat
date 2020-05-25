let Users = require("../models/UserModel");

module.exports = {
    register: function (username, password, callback) {
        Users.findOne({
            username: username,
            password: password
        }).exec(function (err, user) {
            if (user) {
                callback(false, null, 'Такой логин уже используется');
            }
            else {
                let newUser = new Users({
                    username: username,
                    password: password
                });
                newUser.save(function (err) {
                    if (err) return handleError(err);
                });
                console.log("Новый пользователь", newUser);
                callback(newUser, err, 'Пользователь зарегистрирован')
            }
        });
    },

    login: function (username, password, callback) {
        Users.findOne({
            username: username,
            password: password
        }).exec(function (err, user) {
            if (!user) {
                callback(false, null, 'Неверный логин или пароль')
            } else callback(user, err, 'Выполнен вход в аккаунт')
        });
    }

};
