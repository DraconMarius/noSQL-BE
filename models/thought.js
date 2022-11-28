const { Schema, model } = require('mongoose');
const React = require('./react');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_Length: 80,
        },
        author: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        created_At: {
            type: Date,
            default: Date.now()
        },
        reaction: [React],

    }, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
});

//virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
//since we are nesting thoughts inside Users, directly export schema and not model
// const Thought = model('thought', thoughtSchema);

module.exports = thoughtSchema;