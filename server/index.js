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

const {
  getRestaurantMenu,
  postDivision,
  updateDivisions,
  deleteDivision,
  postItem,
  updateItem,
  deleteItem
} = require("./controller/menuController");

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

// auth controller connections
app.get("/api/user", userInfo);
app.post("/api/register", register);
app.post("/api/login", login);
app.delete("/api/logout", logout);

// menu controller connections
app.get("/api/menu", getRestaurantMenu);
app.post("/api/menu", postDivision);
app.put("/api/menu", updateDivisions);
app.delete("/api/menu", deleteDivision);

// item controller connections
app.post("/api/items", postItem);
app.put("/api/items", updateItem);
app.delete("/api/items", deleteItem);

const port = SERVER_PORT || 4000;
app.listen(port, () => console.log(`server up and running on ${port}`));
