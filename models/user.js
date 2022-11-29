const { Schema, model } = require('mongoose');
const { Thought } = require('./thought');

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
            ref: 'User'
        }],
        //nested inside users
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        //to exclude the extra id, since we already have the _id
        id: false,
    }
);
//creating virtuals to show friendlist length:
userSchema.virtual('friendCount').get(function () {
    return this.friendList.length; //== reading undefined for some reason
});
// userSchema.virtual('thoughtCount').get(function () {
//     return this.thoughts.length;
// });


// userSchema.virtual('friendCount', {
//     ref: 'user',
//     localField: 'friendList',
//     foreignField: 'user',
//     count: true
// });


const User = model('User', userSchema);

module.exports = User;