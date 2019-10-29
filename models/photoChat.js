const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema(
  {
    _id:{
      type: Number
    },
   
     image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

let Chat = mongoose.model("photoChat", photoSchema);

module.exports = Chat;