const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GallerieSchema = new Schema(
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

let Chat = mongoose.model("Gallerie",GallerieSchema);

module.exports = Chat;