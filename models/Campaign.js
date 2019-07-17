const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./User");
// const Message = require("./Message");
const Character = require("./Character");

const CampaignSchema = new Schema({
  cover_art_url: {
    type: String
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  rules: {
    type: String
  },
  party_limit: {
    type: Number,
    default: 4
  },
  character_sheet_id : {
    type: Schema.Types.ObjectId,
    ref: "characters" 
  },
  message_ids: [{
    type: Schema.Types.ObjectId,
    ref: "messages"
  }],
  user_ids: [{
    type: Schema.Types.ObjectId,
    ref: "users"
  }],
  character_ids: [{
    type: Schema.Types.ObjectId,
    ref: "characters" 
  }],
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "users" 
  },
  is_private: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  img_id: {
    type: Schema.Types.ObjectId,
    refs: 'imgs'
  }
});

CampaignSchema.methods.deleteMessages = function() {
  Message.updateMany(
    { _id: {$in: this.message_ids}},
    { $set: { deleted: true }}
  ).then(status => status)
}
CampaignSchema.methods.deleteCharacters = function () {
  Character.updateMany(
    { _id: { $in: this.character_ids } },
    { $set: { deleted: true } }
  ).then(status => status)
}
CampaignSchema.methods.deleteFromUsers = function() {
  User.updateMany(
    { _id: { $in: this.user_ids } },
    { $pull: { campaign_ids: this._id } },
  ).then(status => status)
}

module.exports = Campaign = mongoose.model("campaigns", CampaignSchema);