const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const server = require("http").Server(app);
const io = require("socket.io")(server);
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
  getEmployeeTickets,
  getAllTickets,
  getDrinkTickets,
  getFoodTickets,
  getFullTicket,
  postTicket,
  editTicket,
  printTicket,
  fulfillTicket,
  getLatestTicketNum
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

io.sockets.on("connection", socket => {
  socket.join("Restaurant");
  console.log("new client connected");
  socket.on("updateBarTickets", tickets => {
    console.log("bar tickets hit");
    io.emit("newBar", tickets);
  }),
    socket.on("newTicket", () => {
      console.log("newTicket hit");
      io.emit("updateTickets", "newTicket");
    });
});

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
app.post("/api/employee", getCurrentEmployee);
app.get(`/api/employee/:restaurant`, getEmployees);
app.post("/api/newEmployee", postEmployee);
app.put("/api/employee", updateEmployee);
app.delete("/api/employee", deleteEmployee);

// ticket controller connections
app.post("/api/tickets", getAllTickets);
app.get("/api/kitchen/:restaurant", getFoodTickets);
app.get("/api/bar/:restaurant", getDrinkTickets);
app.post("/api/ticket", getFullTicket);
app.post("/api/emptickets", getEmployeeTickets);
app.post("/api/newticket", postTicket);
app.put("/api/ticket", editTicket);
app.put("/api/tickets", printTicket);
app.put("/api/madetickets", fulfillTicket);
app.get("/api/tickets/:restaurant", getLatestTicketNum);

const port = SERVER_PORT || 4000;
server.listen(port, () => console.log(`server up and running on ${port}`));
