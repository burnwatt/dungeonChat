const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  campaign_id: {
    type: Schema.Types.ObjectId,
    ref: 'campaigns'
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  char_attrs: {
    type: Object,
    default: {}
  },
  date: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = Character = mongoose.model('characters', CharacterSchema);