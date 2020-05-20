let mongoose = require("mongoose");
let Users = require("../models/UserModel");


const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    sendBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
});

const Messages = mongoose.model('Messages', MessageSchema);

module.exports = Messages;

