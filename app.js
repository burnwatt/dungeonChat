const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const db = require("./config/keys").mongoURI;

const users = require("./routes/api/users");
const campaigns = require("./routes/api/campaigns");
const characters = require("./routes/api/characters");
const messages = require("./routes/api/messages");

//------------------------------------------------------------------------------
// -----------------------------------------------------------------------------
//require the http module
const http = require("http").Server(app);

// require the socket.io module
const io = require("socket.io");
// -----------------------------------------------------------------------------
//------------------------------------------------------------------------------


mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
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
app.use("/api/campaigns", campaigns);
app.use("/api/characters", characters);
app.use("/api/messages", messages);
// End Define Routes

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
socket = io(http);

socket.on("connection", client => {
  console.log("user connected");

  client.on("here", () => console.log("here"));

  client.on("newMessage", function () {
    client.broadcast.emit("received");
  });

});

// -----------------------------------------------------------------------------
//------------------------------------------------------------------------------

const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Server is running on port ${port}`));