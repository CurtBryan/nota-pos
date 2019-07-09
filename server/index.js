require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();

app.use(express.static(__dirname + "/build"));

app.use(express.json());

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const {
  login,
  register,
  userInfo,
  logout
} = require("./controller/authController");

app.use(
  session({
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 // twoweeks
    }
  })
);

mongoose
  .connect(CONNECTION_STRING, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("mongo connected"))
  .catch(() => console.log("mongo failed"));

app.get("/api/user", userInfo);
app.post("/api/register", register);
app.post("/api/login", login);
app.delete("/api/logout", logout);

const port = SERVER_PORT || 4000;
app.listen(port, () => console.log(`server up and running on ${port}`));
