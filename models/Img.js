var mongoose = require('mongoose')
var Schema = mongoose.Schema;
const Character = require('./Character')

var ImgSchema = new Schema({
  img: { data: Buffer, contentType: String }
}, {
    timestamps: true
  });

  ImgSchema.methods.makeAssociation = function (imgId, aId, type) {
    debugger
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
      default:
        return null;
    }
  }
module.exports = mongoose.model('imgs', ImgSchema);