const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const db = require("./config/keys").mongoURI;

const users = require("./routes/api/users");
//------------------------------------------------------------------------------

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// Define Routes
app.get("/", (req, res) => res.send("DungeonChat!"));
app.use(passport.initialize());
require("./config/passport")(passport);

// Define Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// End Define Middleware

app.use("/api/users", users);
// End Define Routes

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));