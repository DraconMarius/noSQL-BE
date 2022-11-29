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
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
        //nested inside users
        thoughts: [thoughtSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        //to exclude the extra id, since we already have the _id
        id: false,
    }
);
//creating virtuals to show friendlist length:
thoughtSchema.virtual('friendCount').get(function () {
    return this.friendList.length;
});


const User = model('user', userSchema);

module.exports = User;