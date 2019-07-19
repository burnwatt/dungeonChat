const express = require("express");
const fs = require('fs');
const Img = require("../../models/Img")

const router = express.Router();
const { errRes } = require("../../validation/validation_util");


const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    // debugger
    cb(null, '../../frontend/src/assets/public/uploads/')
  }
});

const upload = multer({ storage: storage });
const defErrs = {
  noIdImgs: { noImgFound: "No img found with that ID" },
};


router.route('/img_data')
  .post(upload.single('picture'), function (req, res) {
    var new_img = new Img;
    // debugger
    // var new_img = new Img({ data: { type: 'Buffer', data: { img: {data: "image here"} } } });
    new_img.img.data = fs.readFileSync(req.file.path)
    new_img.img.contentType = 'image/png';
    new_img.save();
    res.json({ message: 'New image added to the db!' });
  }).get(function (req, res) {
    Img.findOne({}, 'img createdAt', function (err, img) {
      if (err)
        res.send(err);
      res.contentType('json');
      res.send(img);
    }).sort({ createdAt: 'desc' });
  });

// ROUTES FOR ASSOCIATIONS METHOD OF ADDING IMAGE TO DOCUMENTS
// IMPLEMENTING LATER
router.route('/char')
  .post(upload.single('picture'), function (req, res) {
    // debugger
    // console.log(req.params);
    var new_img = new Img;
    // console.log(fs.readFileSync(req.file.path));
    new_img.img.data = fs.readFileSync(req.file.path)
    new_img.img.contentType = 'image/png';
    new_img.save();
    new_img.makeAssociation(new_img._id, req.body.character_id, "char")
    // res.json({ message: 'New image added to the db!' });
    res.send(new_img);
  })

router.route('/camp')
  .post(upload.single('picture'), function (req, res) {
    // debugger
    var new_img = new Img;
    new_img.img.data = fs.readFileSync(req.file.path)
    new_img.img.contentType = req.body.contentType;
    new_img.save();
    new_img.makeAssociation(new_img._id, req.body.campaign_id, "camp")
    // res.json({ message: 'New image added to the db!' });
    res.send(new_img);
  })
// END ASSOCIATOS ROUTES



router.get('/img_data/:id', (req, res) => {
  Img.findById(req.params.id)
    .then(img => {
      // res.setHeader('content-type', img.contentType);
      res.setHeader('content-type', 'image/png');

      // res.contentType('json');
      res.send(img);
      // res.json(img)
    })
    .catch(err => errRes(res, 404, defErrs.noIdImgs))
})

module.exports = router;
