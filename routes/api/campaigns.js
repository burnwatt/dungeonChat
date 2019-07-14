const express = require("express");
const router = express.Router();
const passport = require("passport");

const Campaign = require("../../models/Campaign");

const { errRes } = require("../../validation/validation_util");
const validateCampaignInput = require("../../validation/campaigns");


// Campaign
const defErrs = {
  campaignNameNotAvailable: { campaign: "A campaign of that name already exists!" },
  noCampaignsFound: { noCampaignFound: "No campaigns found!"},
  noUserCampaigns: { noCampaignFound: "No campaigns found for that user"},
  noIdCampaigns: { noCampaignFound: "No campaign found with that ID" },
  noNameCampaigns: { noCampaignFound: "No campaign found with that name" },
  failedUpdateCampaign: { campaign: "Failed to update campaign"},
  failedDeleteCampaign: { campaign: "Failed to delete campaign"}
};

// POST ----------------------------------------
const campaignObj = (req) => ({
  cover_art_url: req.body.cover_art_url || null,
  password: req.body.password || null,
  name: req.body.name,
  description: req.body.description || "",
  rules: req.body.rules || "",
  is_private: req.body.is_private,
  // character_sheet_id: req.character_sheet.id,
  created_by: req.user.id,
  character_ids: req.body.character_ids
})

const campaignBcrypt = (newCampaign) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newCampaign.password, salt, (err, hash) => {
      if (err) throw err;
      newCampaign.password = hash;
    })
  });
};

const createCampaign = (req, res) => {
  const newCampaign  = new Campaign(campaignObj(req));
  if (newCampaign.password) campaignBcrypt(newCampaign);
  newCampaign.save()
    .then(campaign => res.json(campaign))
    .catch(err => console.log(err));
}
// create .........................................
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateCampaignInput(req.body);
  if (!isValid) return errRes(res, 400, errors);

  Campaign.findOne({ name: req.body.name })
    .then( campaign => {
      if (campaign) return errRes(res, 400, defErrs.campaignNameNotAvailable)
      else createCampaign(req, res);
    });
});

// UPDATE

// update .....................
router.post("/update", passport.authenticate("jwt", { session: false }), (req, res) => {
  Campaign.findOneAndUpdate(
    { _id: req.body.id },
    req.body,
    {new: true}
  ).then(campaign => res.json(campaign))
   .catch(err => errRes(res, 200, defErrs.failedUpdateCampaign))
})

// GET ----------------------

// test ............................
router.get("/test", (req, res) => res.json({ msg: "This is the campaigns router."}));

// /
router.get("/", (req, res) => {
  Campaign.find()
    .sort({ date: 1 })
    .then(campaigns => res.json(campaigns))
    .catch(err => errRes(res, 404, defErrs.noCampaignsFound))
});

// /user/:user_id
router.get("/user/:user_id", (req, res) => {
  Campaign.findOne({ created_by: req.params.user_id })
    .then(campaigns => res.json(campaigns))
    .catch(err => errRes(res, 404, defErrs.noUserCampaigns))
});

// /:id
router.get("/:id", (req, res) => {
  Campaign.findById(req.params.id)
    .then(campaign => res.json(campaign))
    .catch(err => errRes(res, 404, defErrs.noIdCampaigns))
});

// /:name
router.get("/name/:name", (req, res) => {
  Campaign.findOne({ name: req.params.name})
    .then(campaign => res.json(campaign))
    .catch(err => errRes(res, 404, defErrs.noNameCampaigns))
});

// DELETE ------------------------------------------------------------

// delete
// router.post("/delete", passport.authenticate("jwt", { session: false }), (req, res) => {
//   Campaign.findOneAndDelete(req.body.id)
//     .then(campaign => {
//       // campaign.deleteFromUsers();
//       if (campaign) res.json({ msg: "Campaign Deleted Successfully" })
//       else errRes(res, 200, defErrs.failedDeleteCampaign)
//     });
    
// });
router.post("/delete", passport.authenticate("jwt", { session: false }), (req, res) => {
  Campaign.findOne({ _id: req.body.id })
    .then(campaign => {
      // campaign.deleteFromUsers();
      if (campaign) {
        campaign.deleted = true;
        campaign.save();
        campaign.deleteMessages();
        campaign.deleteCharacters();
        res.json(campaign._id);
      } else errRes(res, 200, defErrs.failedDeleteCampaign)
    });

});


// End Campaign


module.exports = router;