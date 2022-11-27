const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought');

//User template
const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        //referencing _id of other users
        friendList: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        }],
        //nested inside users
        thoughts: [thoughtSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('user', userSchema);

module.exports = User;