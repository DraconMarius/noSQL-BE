const { Schema, model } = require('mongoose');
const reactSchema = require('./react');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_Length: 80,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
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
});

//virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;