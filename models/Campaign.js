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
    type: String,
    minlength: 2,
    maxlength: 75,
  },
  description: {
    type: String,
    maxlength: 500
  },
  rules: {
    type: String,
    maxlength: 1000
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