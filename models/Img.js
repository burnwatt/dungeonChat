var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ImgSchema = new Schema({
  img: { data: Buffer, contentType: String }
}, {
    timestamps: true
  });

  ImgSchema.methods.makeAssociation = function (imgId, aId, type) {
    switch (type){
      case "char":
        Message.updateOne(
          { _id: aId },
          { $set: { "char_attrs.img_id": imgId } }
        ).then(status => status)
    }
  }
module.exports = mongoose.model('imgs', ImgSchema);