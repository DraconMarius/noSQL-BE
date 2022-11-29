const { User, Thought } = require('../models');

//module export to routes
module.exports = {
    //GET all users
    getAllThought(req, res) {
        Thought.find()
            //exclude __v
            .select('-__v')
            .populate({
                path: "author", select: 'userName'
            })
            .populate({
                path: "reaction", select: 'reactBody, author'
            })
            .then((thoughtData) => {
                console.log(thoughtData)
                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //POST new Thought
    newThought(req, res) {
        Thought.create(req.body)
            .then((newThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.author },
                    { $addToSet: { thoughts: _id } },
                    { new: true }
                )
            })
            .then((user) => {
                !user
                    ? res.satatus(404).json({ warning: "error linking thought to user, user ID incorrect" })
                    : res.json("created new thought");
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //GET thoughts by thought ID
    getByID(req, res) {
        Thought.findOne({ _id: req.params.thoughtID })
            .select('-__v')
            .populate({
                path: "reaction", select: 'reactBody, author'
            })
            .populate({
                path: "author", select: 'userName'
            })
            .then((postData) => {
                //ternary statement: if userData does not exists:
                !postData
                    ? res.status(404).json({ warning: 'Unknown Post ID' })
                    : res.json(postData);
            });
    },

    //POST update by thought ID
    updateByID(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtID }, req.body, {
            //return the updated version
            new: true,
            runValidators: true,
        })
            .then((updatedThought) => {
                !updatedThought
                    ? res.status(404).json({ warning: 'Wrong Thought ID' })
                    : res.json(updatedThought);
            });
    },


    //delete Thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtID })
            .then((deletedThought) => {
                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtID },
                    { $pull: { thoughts: req.params.thoughtID } },
                    { new: true }
                )
            })
            .then((user) => {
                !user
                    ? res.satatus(404).json({ warning: "error error updating user's thought, thought ID incorrect" })
                    : res.json("deleted thought and updated user");
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

};

