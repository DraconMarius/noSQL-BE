const { Schema, model } = require('mongoose');
const reactSchema = require('./react');
// const React = require('./react');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_Length: 280,
        },
        author: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        created_At: {
            type: Date,
            default: Date.now()
        },
        reaction: [reactSchema],

    }, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false,
});

//virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;