const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fichierSchema = new Schema(
  {
    _id:{
      type: Number
    },
   
     fichier: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

let Chat = mongoose.model("ficherChat", fichierSchema);

module.exports = Chat;