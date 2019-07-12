const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const User = require("../../models/User");

const { errRes } = require("../../validation/validation_util");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// User
const defErrs = {
  emailNotAvailable: { email: "A user has already registered with that email"},
  emailIncorrect: { email: "This user does not exist!"},
  passwordIncorrect: { password: "Password is incorrect"},
  noUsersFound: { users: "No users found!"},
  noUserFound: { user: "No user found with that ID!"}
};

// POST ---------------------
const userObj = (body) => ({
  handle: body.handle,
  email: body.email,
  password: body.password
});

const userBcrypt = (newUser, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    })
  });
};

const createUser = (req, res) => {
  const newUser = new User(userObj(req.body));
  userBcrypt(newUser, res);
};

// register .....................................................
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return errRes(res, 400, errors);

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) return errRes(res, 400, defErrs.emailNotAvailable)
      else createUser(req, res);
    })
});

// login .....................................................
const userPayload = (user) => ({
  id: user.id,
  handle: user.handle,
  email: user.email
});

const userResponse = (user, res) => (
  jwt.sign(
    userPayload(user),
    keys.secretOrKey,
    { expiresIn: 86400 },
    (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      });
    }
  )
);

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return errRes(res, 400, errors);

  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) return errRes(res, 404, defErrs.emailIncorrect);
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) userResponse(user, res)
          else return errRes(res, 400, defErrs.passwordIncorrect);
        })
    })

});

// GET -----------------------

// /.................................
router.get("/", (req, res) => {
  User.find()
    .sort({ date: 1 })
    .then(users => res.json(users))
    .catch(err => errRes(res, 404, defErrs.noUsersFound))
});

router.get("/:id", (req, res) => {

  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => errRes(res, 404, defErrs.noUserFound))
})

// test ...........................
router.get("/test", (req, res) => res.json({ msg: "This is the users route!!" }));

// current .....................
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  const user = userPayload(req.user);
  res.json(user);
});

// End User


module.exports = router;