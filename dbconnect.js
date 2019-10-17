const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url = "mongodb://localhost:32017/Message";

const connect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = connect;
