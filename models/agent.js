const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agentSchema = new Schema(
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

let Chat = mongoose.model("agent",agentSchema)
module.exports = Chat;