const { User } = require('../models');

//module export to routes
module.exports = {
    //GET all users
    getAllUsers(req, res) {
        User.find()
            //exclude __v
            .select('-__v')
            .populate({
                path: "friendList", select: 'userName',
            })
            // .populate('friendCount')
            .then((allData) => {
                console.log(allData)//.friendCount;
                res.json(allData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //POST new user
    newUser(req, res) {
        User.create(req.body)
            .then((newUser) => {
                console.log("created new uesr");
                res.json(newUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //GET user by ID
    getByID(req, res) {
        User.findOne({ _id: req.params.userID })
            .select('-__v')
            .populate({
                path: "friendList", select: 'userName'
            })
            .populate({
                path: "thoughts", select: '-__v'
            })
            .then((userData) => {
                //ternary statement: if userData does not exists:
                !userData
                    ? res.status(404).json({ warning: 'Unknown User' })
                    : res.json(userData);
            });
    },

    //POST update by ID
    updateByID(req, res) {
        User.findOneAndUpdate({ _id: req.params.userID }, req.body, {
            //return the updated version
            new: true,
            runValidators: true,
        })
            .then((updatedUser) => {
                !updatedUser
                    ? res.status(404).json({ warning: 'Unknown User' })
                    : res.json(updatedUser);
            });
    },

    //POST add Friend
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userID }, { $addToSet: { friendList: req.body.friendID } }, {
            new: true,
        })
            .then((userData) => {
                !userData
                    ? res.status(404).json({ warning: 'error adding friend' })
                    : res.json(userData);
            });
    },

    //remove Friend
    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userID }, { $pull: { friendList: req.body.friendID } }, {
            new: true,
        })
            .then((userData) => {
                !userData
                    ? res.status(404).json({ warning: 'error removing friend' })
                    : res.json(userData);
            })
    },

    //delete User
    deleteUser(req, res) {
        User.findOneAndDelet({ _id: req.params.userID })
            .then(deleted => {
                !deleted
                    ? res.status(404).json({ warning: 'unknown User' })
                    : res.json(deleted);
            })
    },

};


