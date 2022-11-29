const { Thought } = require('../models');

//modukle export to routes
module.exports = {
    //add Reaction to thought by thought ID
    addReact(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $addToSet: { reaction: req.body } },
            { new: true }
        )
            .then((reactedThought) => {
                !reactedThought
                    ? res.status(404).json({ warning: "error: reaction failed" })
                    : res.json(reactedThought);
            })
    },

    //delete by reaction ID
    deleteReact(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $pull: { reaction: { _id: req.params.reactID } } },
            { new: true }
        )
            .then((updatedThought) => {
                !updatedThought
                    ? res.status(404).json({ warning: "error: deleting reaction failed" })
                    : res.json(updatedThought);
            })
    },
};