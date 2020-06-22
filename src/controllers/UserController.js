let Users = require("../models/UserModel");
const mongoose = require("mongoose");
let sinon = require("sinon");

function isValidLogin (login) {
    return (!!login && typeof login === "string" && login.length < 20);
}

function isValidPassword(password) {
    return (!!password && typeof password === "string" && password.length < 25);
}


function isStrongPwd(password) {
    let msg;
    let regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
    let validPassword =  regExp.test(password);
    if (!validPassword) msg = "Пароль должен содержать как минимум 8 символов, из которых минимум 1 число, " +
        "1 специальный символ и латинские буквы обоих регистров";
    else msg = "Ок";
    return [validPassword, msg];
}

module.exports = {

    isValidLogin,

    isValidPassword,

    isStrongPwd,


    register: function (username, password, callback) {
        Users.findOne({
            username: username
        }).exec(function (err, user) {
            if (user) {
                callback(false, null, 'Такой логин уже используется');
            }
            else {
                if (!isValidLogin(username) || !isValidPassword(password)) callback(false, null, "Неправильный формат входных данных");
                else {
                    let newUser = new Users({
                        username: username,
                        password: password
                    });
                    newUser.save(function (err) {
                        if (err) {
                            callback(false, null, 'Такой логин уже используется');
                            return handleError(err);
                        }
                    });
                    console.log("Новый пользователь", newUser);
                    callback(newUser, err, 'Пользователь зарегистрирован')
                }
            }
        });
    },

    login: function (username, password, callback) {
        console.log(Users);
        Users.findOne({
            username: username,
            password: password
        }).exec(function (err, user) {
            if (!user) {
                callback(false, null, 'Неверный логин или пароль')
            } else callback(user, err, 'Выполнен вход в аккаунт')
        });
    },

    testLogin: function (username, password) {
        if (typeof username !== 'string' || typeof password !== 'string')
            return ["Неверный тип входных данных", false];
        //console.log(typeof password);
        let user1 = {username: "anyasinyavskaya", password: "1999"};
        let user2 = {username: "anyasinyavskaya1", password: "1999"};
        let users = new Map();

        users.set(user1.username, user1.password);
        users.set(user2.username, user2.password);

        const modelStub = sinon.stub(Users);

        modelStub.findOne = sinon.stub().withArgs(username, password).callsFake(function (user) {
            if (users.get(user.username))
                return ["Пользователь с таким именем уже зарегистрирован", false];
            else return ["Пользователь успешно создан", true];
        });


        return Users.findOne({
            username: username,
            password: password
        })

    }

};
