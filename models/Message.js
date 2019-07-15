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

MessageSchema.methods.addRelations = function () {
  let cp = Campaign.updateOne(
    { _id: this.campaign_id },
    { $addToSet: { message_ids: this._id }}
  ).then(status => { return Promise.resolve(status) })

  let up = User.updateOne(
    { _id: this.user_id },
    { $addToSet: { message_ids: this._id } }
  ).then(status => { return Promise.resolve(status) })

  return [cp, up];
}

module.exports = Message = mongoose.model("messages", MessageSchema);