const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgentDisponibleSchema = new Schema(
{
    _id:{
      type: Number
    },
     iduser:{
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

let Chat = mongoose.model("disponible",  AgentDisponibleSchema);

module.exports = Chat;