const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./User");
const Character = require("./Character");
const Campaign = require("./Campaign");

const MessageSchema = new Schema({

  campaign_id: {
    type: Schema.Types.ObjectId,
    ref: "campaigns"
  },
  character_id: {
    type: Schema.Types.ObjectId,
    ref: "characters"
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  type: {
    type: String,
    default: "Say"
  },
  body: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  }
})

module.exports = Message = mongoose.model("messages", MessageSchema);