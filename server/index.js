const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
require("dotenv").config();

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

const {
  getCurrentEmployee,
  getEmployees,
  postEmployee,
  updateEmployee,
  deleteEmployee
} = require("./controller/employeeController");

const {
  getAllTickets,
  getDrinkTickets,
  getFoodTickets,
  getFullTicket,
  postTicket,
  editTicket,
  printTicket
} = require("./controller/ticketController");

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
app.get("/api/menu/:restaurant", getRestaurantMenu);
app.post("/api/menu", postDivision);
app.put("/api/menu", updateDivisions);
app.delete("/api/menu", deleteDivision);

// item controller connections
app.post("/api/items", postItem);
app.put("/api/items", updateItem);
app.delete("/api/items", deleteItem);

// employee controller connections
app.post("api/employee", getCurrentEmployee);
app.get(`/api/employee/:restaurant`, getEmployees);
app.post("/api/employee", postEmployee);
app.put("/api/employee", updateEmployee);
app.delete("/api/employee", deleteEmployee);

// ticket controller connections
app.get("/api/tickets", getAllTickets);
app.get("/api/kitchen/:restaurant", getFoodTickets);
app.get("/api/bar/:restaurant", getDrinkTickets);
app.get("/api/ticket", getFullTicket);
app.post("/api/tickets", postTicket);
app.put("/api/ticket", editTicket);
app.put("/api/tickets", printTicket);

const port = SERVER_PORT || 4000;
app.listen(port, () => console.log(`server up and running on ${port}`));
