const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url = "mongodb+srv://sandy:andomalala@cluster0-nkfjf.mongodb.net/test?retryWrites=true&w=majority";
// const url = 'mongodb://localhost:32017/zioncall';

const connect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = connect;
