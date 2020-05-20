process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Messages = require("../controllers/models/MessageModel");
let rooms = require("../controllers/models/RoomModel");
let Users = require("../controllers/models/UserModel");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

let agent = chai.request.agent('http://localhost:3005');
describe('/POST/ login', () => {
    it('Должна произойти авторизация', (done) => {
        agent.post('/login')
            .send({username: 'anyasinyavskaya', password: '1999'})
            .then(function (res) {
                agent.get('/chat')
                    .then(function (res2) {
                        // should get status 200, which indicates req.session existence.
                        res2.should.have.status(200);
                        done();
                    });
            });
    });
});

describe('/GET/chat/create', () => {
    it('Создание нового чата', (done) => {
        agent.get('/chat/create')
            .send({name: 'chat21'})
            .then(function (res) {
                res.should.
                agent.get('/chat')
                    .then(function (res2) {
                        // should get status 200, which indicates req.session existence.
                        res2.should.have.status(200);
                        done();
                    });
            });
    });
});