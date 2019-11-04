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

let Chat = mongoose.model("client", userSchema);

module.exports = Chat;
