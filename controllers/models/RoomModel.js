let Set = require("collections/set");
let List = require("collections/list");
let mongoose = require("mongoose");
let Users = require("../models/UserModel");
let Messages = require("../models/MessageModel");



const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages',
        required: true,
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: true,
    }],
});

const Room = mongoose.model('Rooms', RoomSchema);

module.exports = Room;


