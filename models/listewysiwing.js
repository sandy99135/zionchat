const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wysiwingSchema = new Schema(
  {
    _id:{
      type: Number
    },
   
    wysiwing: {
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

let Chat = mongoose.model("wysiwing", wysiwingSchema);

module.exports = Chat;