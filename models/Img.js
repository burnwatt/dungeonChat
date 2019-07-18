var mongoose = require('mongoose')
var Schema = mongoose.Schema;
const Character = require('./Character')
const Campaign = require('./Campaign')

var ImgSchema = new Schema({
  img: { data: Buffer, contentType: String }
}, {
    timestamps: true
  });

  ImgSchema.methods.makeAssociation = function (imgId, aId, type) {
    // debugger
    switch (type){
      case "char":
        // Character.findOneAndUpdate(
        //   { _id: aId },
        //   { char_attrs: { img_id: imgId } },
        //   { new: true }.then()
        // )
        // Character.updateOne(
        //   { _id: aId },
        //   { img_id: imgId }
        // ).then(status => status)
        Character.updateOne(
          { _id: aId },
          { $set: { "char_attrs.img_id": imgId } }
        ).then(status => status)
      case "camp":
        Campaign.updateOne(
          {_id: aId},
          { $set: { "img_id": imgId} }
        ).then(status => status)
      default:
        return null;
    }
  }
module.exports = mongoose.model('imgs', ImgSchema);