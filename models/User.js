const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  campaign_ids: [{
    type: Schema.Types.ObjectId,
    ref: "campaign"
  }],
  character_ids: [{
    type: Schema.Types.ObjectId,
    ref: "characters"
  }],
  message_ids: [{
    type: Schema.Types.ObjectId,
    ref: "messages"
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);