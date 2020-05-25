module.exports = [

    'enter',
    '/chat/enter?name=ch2',

    {
        method: 'GET',

        before: '/login?username=anyasinyavskaya&password=1999',

        result: {
            status: 200
        }
    },

    'logout',
    '/room/logout',
    {
        method: 'GET',

        result: {
            status: 200
        }
    },

    'enter after logout',
    '/chat/enter?name=ch2',

    {
        method: 'GET',

        result: {
            status: 200
        }
    },
];
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
            name: 'ch3'
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
            name: 'ch3'
        },

        result: {
            data: {
                type: 'array'
            }
        }
    },

    'send message',
    '/room/send?name=ch3&text=test',

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

*/