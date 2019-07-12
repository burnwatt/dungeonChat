const express = require("express");
const router = express.Router();
const passport = require("passport");

const Campaign = require("../../models/Campaign");

const { errRes } = require("../../validation/validation_util");

const defErrs = {
    characterNameNotAvailable: { characterNameExists: "A character of that name already exists!" },
    noCharactersFound: { noCharactersFound: "No characters found!" },
    noIdCharacters: { noCharacterFound: "No character found with that ID" },
    failedUpdateCampaign: { campaign: "Failed to update campaign" },
    failedUpdateCharacter: { character: "Failed to update character"}
};

// POST ----------------------------------------
const characterObj = (req) => ({
    campaign_id: req.body.campaign_id || null,
    user_id: req.body.user_id || null,
    char_attrs: req.body.char_attrs || {},
});


/*
Updates campaign to include the newly created character's id
*/
const updateCampaign = (res, char) => Campaign.findOneAndUpdate(
    { _id: char.campaign_id },
    { $addToSet: { character_ids: char._id } },
    { new: true },
    err => {
        if (err) errRes(res, 200, defErrs.failedUpdateCampaign);
        else res.json({ msg: "Campaign updated successfully", dat: char._id });
    }
);

/*
Creates character, saves to db, and calls updateCampaign
*/
const createCharacter = (req, res) => {
    const newChar = new Character(characterObj(req));
    newChar
        .save()
        .then(char => updateCampaign(res, char))
        .catch(err => console.log(err));
};


// const updateCampaign = (res, char) => Campaign.findOneAndUpdate(
//     { _id: char.campaign_id },
//     { character_ids: char._id },
//     { new: true },
//     err => {
//       if (err) errRes(res, 200, defErrs.failedUpdateCampaign);
//       else res.json({msg:"Campaign updated successfully", character: char});
//     }
// );

/*
Creates character, saves to db, and calls updateCampaign
*/
// const createCharacter = (req, res) => {
//   const newChar = new Character(characterObj(req));
//   newChar
//     .save()
//     .then(char => {
//         updateCampaign(res, char)
//     })
//     .catch(err => console.log(err));
// };

//POST route to create character
router.post("/", passport.authenticate("jwt", {session: false}), (req,res) => {
    Character.findOne({char_attrs: req.body.char_attrs})
        .then( char => {
            if(char) errRes(res, 400, defErrs.characterNameNotAvailable)
            else createCharacter(req, res);
        });
});

// GET  ----------------------------------------

//Fetch all characters
router.get('/', (req, res) =>{
    Character.find()
        .then(chars => res.json(chars))
        .catch(err => errRes(res, 404, defErrs.noCharactersFound))
});

// Fetch a specific character
router.get('/:id', (req, res) => {
    Character.findById(req.params.id)
        .then(chars => res.json(chars))
        .catch(err => errRes(res, 404, defErrs.noCharactersFound))
});

// UPDATE --------------------------------------
router.post("/update/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Character.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(char => res.json({msg: 'Update Sucessful', character: char}))
        .catch(err => errRes(res, 200, defErrs.failedUpdateCharacter))
});
module.exports = router;
