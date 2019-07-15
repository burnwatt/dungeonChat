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


CharacterSchema.methods.addRelations = function () {
  let cp = Campaign.updateOne(
    { _id: this.campaign_id },
    { $addToSet: { character_ids: this._id } }
  ).then(status => { return Promise.resolve(status) })

  let up = User.updateOne(
    { _id: this.user_id },
    { $addToSet: { character_ids: this._id } }
  ).then(status => { return Promise.resolve(status) })

  return [cp, up];
}

module.exports = Character = mongoose.model('characters', CharacterSchema);