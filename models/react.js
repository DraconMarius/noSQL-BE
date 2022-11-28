const { Schema, model } = require('mongoose');

const reactSchema = new Schema(
    {
        reactBody: {
            type: String,
            requires: true,
            max_Length: 80,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        },
        created_At: {
            type: Date,
            default: Date.now()
        },
    });

const React = model('react', reactSchema);

module.exports = React;