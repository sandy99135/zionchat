const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    _id:{
      type: Number
    },
   
     video: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

let Chat = mongoose.model("videoChat", videoSchema);

module.exports = Chat;