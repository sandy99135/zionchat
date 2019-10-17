const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id:{
      type: Number
    },
   
     nom: {
      type: String
    },
     password: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

let Chat = mongoose.model("user", userSchema);

module.exports = Chat;