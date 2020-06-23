
let userController = require("../src/controllers/UserController");

// Для тестирования расскоментируйте один из примеров и запустите testy --config

/**
 * Пример #1
 */

/*
module.exports = [


    'login',
    '/login',

    {
        method: 'POST',

        params: {
            username: 'anyasinyavskaya1',
            password: '1999'
        },

        result: {
            status: 302
        }
    },

    'enter',
    '/chat/enter',

    {
        method: 'GET',

        params: {
            name: 'ch7'
        },


        result: {
            status: 200
        }
    },

    'get messages',
    '/room/getMessages',

    {
        method: 'POST',

        params: {
            name: 'ch7'
        },

        result: {
            data: {
                type: 'array',
                eachType: 'object',
            }
        }
    },

    'send message',
    '/room/send?name=ch7&text=test',

    {
        method: 'POST',

        result: {
            data: {
                type: 'json',
                properties: {
                    message: {
                        value: "Сообщение отправлено",
                        type: 'String'
                    },
                    result: {
                        type: 'object',
                        properties: {
                            _id: {
                                required: true
                            },

                            text: {
                                required: true,
                                type: 'String'
                            },
                            sendBy: {
                                required: true
                            }

                        }

                    }
                }
            }
        }

    }
];*/

/**
 * Пример #2
 */

/*
module.exports = [

    'enter',
    '/chat/enter',

    {
        method: 'GET',

        params: {
            name: 'ch7'
        },

        before: '/login?username=anyasinyavskaya1&password=1999',

        after: '/room/getMessages?name=ch7',

        result: {
            status: 200
        }
    },

];
*/

/**
 * Пример #3
 */

/*
module.exports = [

    'authorization',
    '/register',

    {
        method: 'POST',

        params: {
            username: 'anyasinyavskaya00000',
            password: true
        },
        result: {
            status: 403,
            data: {
                properties: {
                    error:"Неправильный формат входных данных"
                }
            }
        }
    }

];

*/

/**
 * Пример #4
 */

/*

module.exports = [

    'Unit test for login',
    userController.testLogin,
    {
        params: {
            username: "anyasinyavskaya1",
            password: "1999"

        },

        result: {
            data: {
                value: ["Пользователь с таким именем уже зарегистрирован", false]
            }
        }
    }
];
*/

/**
 * Пример #5
 */

/*
module.exports = [
    'Проверка пароля на сложность',
    userController.isStrongPwd,
    {
        params: {
            password: '1abYcYY#'
        },
        result: {
            data: {
                value: [true, 'Ок']
            }
        }
    }
];
*/
