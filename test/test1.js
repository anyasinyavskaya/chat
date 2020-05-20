module.exports = [

    'login',
    '/login',

    {

        method: 'POST',

        params: {
            username: 'anyasinyavskaya',
            password: '1999'
        },

        result: {
            status: 302
        }
    },

    'enter',
    '/chat/enter?name=chat21',

    {
        method: 'GET',
        result: {
            status: 200
        }
    },

    'send message',
    '/room/send',

    {
        method: 'POST',

        params: {
            name: 'chat21',
            text: 'test'
        },

        result: {
            data: {
                type: 'json',
                properties: {
                    message: {
                        value: "Сообщение отправлено",
                        type: 'String'
                    },
                    sended: {
                        type: 'object',
                        properties: {
                            _id: {
                                required: true,
                                maxValue: 10
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

    },
];
