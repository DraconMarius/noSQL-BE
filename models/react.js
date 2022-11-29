const { Schema } = require('mongoose');

const reactSchema = new Schema(
    {
        reactBody: {
            type: String,
            requires: true,
            max_Length: 80,
        },
        author: {
            type: Schema.Types.ObjectId, ref: "user"
        },
        created_At: {
            type: Date,
            default: Date.now()
        },

    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

//similar to thought, we are nesting reaction in each thought.
//exporting the schema
// const React = model('react', reactSchema);

module.exports = reactSchema;