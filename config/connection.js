const { connect, connection } = require('mongoose');

//seeting up connection to mongoose, (locally)
connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//exporting it to be used in server.js
module.exports = connection;

