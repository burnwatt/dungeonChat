const express = require("express");
const router = express.Router();
const passport = require("passport");

const Message = require("../../models/Message");
const validateMessageInput = require("../../validation/messages");
const { errRes } = require("../../validation/validation_util");


// Message

const defErrs = {
  failedUpdateMessage: { message: "Failed to update message"},
  noMessagesFound: { message: "No messages found"},
  noIdMessage: { message: "No message found with that ID"},
  failedMessagesRetrival: { message: "Failed to retrieve messages for that user"},
  failedDeleteMessage: { message: "Failed to delete message"}
};

// POST ------------------------------------

// create ..............................
const messageObj = req => ({
  campaign_id: req.body.campaign_id,
  character_id: req.body.character_id,
  user_id: req.body.user_id,
  type: req.body.type,
  body: req.body.body
});

const createMessage = (req, res) => {
  const newMessage = new Message(messageObj(req));
  newMessage.addRelations();
  newMessage.save()
    .then(message => res.json(message))
    .catch(err => console.log(err));
}

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateMessageInput(req.body);
  if (!isValid) return errRes(res, 400, errors);
  createMessage(req, res);
});

// UPDATE --------------------------------

// update ..............................
router.post("/update", passport.authenticate("jwt", { session: false }), (req, res) => {
  Message.findOneAndUpdate(
    { _id: req.body.id },
    req.body,
    { new: true }
  ).then(message => res.json(message))
   .catch(err => errRes(res, 200, defErrs.failedUpdateMessage));
});

// GET -------------------------------------
// test ......................................
router.get("/test", (req, res) => res.json({ msg: "This is the messages router!!!" }));

// /...........
router.get("/", (req, res) => {
  Message.find()
    .sort({ date: 1})
    .then(message => res.json(message))
    .catch(err => errRes(res, 404, defErrs.noMessagesFound))
});

// :id.............
router.get("/:message_id", (req, res) => {
  Message.findById(req.params.id)
    .then(message => res.json(message))
    .catch(err => errRes(res, 404, defErrs.noIdMessage))
});



router.get("/collection/collect", (req, res) => {
  Message.find({ _id: { $in: req.body.message_ids } })
    .then(messages => res.json(messages))
    .catch(err => errRes(res, 500, defErrs.failedMessagesRetrival))
})

router.post("/delete", passport.authenticate("jwt", { session: false }), (req, res) => {
  Message.findOne({_id: req.body.id})
    .then(message => {
      if (message) {
        message.deleted = true;
        message.save()
          .then(message => res.json(message))
      } else errRes(res, 200, defErrs.failedDeleteMessage)
    })
})

// End Message




module.exports = router;