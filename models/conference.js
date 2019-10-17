const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conferenceSchema = new Schema(
  {
    _id:{
      type: Number
    },
     iduser:{
      type: Number
    },
      titre: {
      type: String
    },
     responsable: {
      type: String
    },

    date: {
      type: String
    },
     heure: {
      type: Number
    },
     minute: {
      type: Number
    },
     participant: {
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

let Chat = mongoose.model("conference", conferenceSchema);

module.exports = Chat;