const { User } = require('../models');

//module export to routes
module.exports = {
    //get all users
    getAllUsers(req, res) {
        User.find()
            .then((allData) => {
                console.log(allData);
                res.json(allData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    //get user by ID
    getByID(req, res) {
        User.findOne({ _id: req.params.userID })
            .populate({
                path: "friendList"
            })
            .then((userData => {
                //ternary statement: if userData does not exists:
                !userData
                    ? res.status(404).json({ warning: 'User Do not exists' })
                    : res.json(userData);
            }));
    },
};
