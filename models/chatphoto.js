const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoChatSchema = new Schema(
  {
    _id:{
      type: Number
    },
     idsender:{
      type: Number
    },
     idreceiver:{
      type: Number
    },
  
    sender: {
      type: String
    },
    receiver: {
      type: String
    },
     image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

let Chat = mongoose.model("chatPhoto",  photoChatSchema);

module.exports = Chat;
