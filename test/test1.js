
let userController = require("../src/controllers/UserController");

/*module.exports = [

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

];*/


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

        before: "kek",

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
];

/*
let userController = require("../src/controllers/UserController");
module.exports = [

    'Unit test for login',
    userController.testLogin,
    {
        params: {
            username: "anyasinyavskaya1",
            password: 1999

        },

        result: {
            data: {
                value: ["Пользователь успешно создан", false]
            }
        }
    }
];


*/