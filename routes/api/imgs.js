const express = require("express");
const fs = require('fs');
const Img = require("../../models/Img")

const router = express.Router();



const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
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
