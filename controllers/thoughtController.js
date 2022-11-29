const { User, Thought } = require('../models');

//module export to routes
module.exports = {
    //GET all users
    getAllThought(req, res) {
        Thought.find()
            //exclude __v
            .select('-__v')
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
            .populate({
                path: "reaction", select: 'reactBody, author'
            })
            .then((newThoughtData) => {
                console.log("created new thought");
                res.json(newThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //GET thoughts by user ID
    getByID(req, res) {
        Thought.find({ _id: req.params.userID })
            .select('-__v')
            .populate({
                path: "reaction", select: 'reactBody, author'
            })
            .then((userData) => {
                //ternary statement: if userData does not exists:
                !userData
                    ? res.status(404).json({ warning: 'Unknown User' })
                    : res.json(userData);
            });
    },

    //POST update by thought ID
    updateByID(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.userID }, req.body, {
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


    //delete thought by ID
    deleteThought(req, res) {
        User.findOneAndDelet({ _id: req.params.thoughtID })
            .then(deleted => {
                !deleted
                    ? res.status(404).json({ warning: 'unknown User' })
                    : res.json(deleted);
            })
    },

};


