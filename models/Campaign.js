const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Campaign = mongoose.model("campaigns", CampaignSchema);