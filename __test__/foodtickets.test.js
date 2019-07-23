require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const mongoose = require("mongoose");

mongoose.connect(CONNECTION_STRING);

describe("ticket tests", () => {
  let db;
  let tickets = [
    { ticketnum: 1 },
    { ticketnum: 1 },
    { ticketnum: 2 },
    { ticketnum: 3 },
    { ticketnum: 3 },
    { ticketnum: 3 }
  ];
  afterAll(() => {
    connection.close();
    db.close();
  });
  it("maps employee tickets should return an array of arrays by ticket number", () => {
    let counter = 0;
    let ticks = [];
    for (let i = 0; i < tickets.length; i++) {
        if (!ticks[0]) {
          ticks.push([tickets[i]]);
        } else if (tickets[i].ticketnum === ticks[counter][0].ticketnum) {
          ticks[counter].push(tickets[i]);
        } else {
          ticks.push([tickets[i]]);
          counter++;
        }
      }
      expect(ticks.length).toEqual(3);
  }) 
  it("maps employee tickets should return 2", () => {
    let counter = 0;
    let ticks = [];
    for (let i = 0; i < tickets.length; i++) {
        if (!ticks[0]) {
          ticks.push([tickets[i]]);
        } else if (tickets[i].ticketnum === ticks[counter][0].ticketnum) {
          ticks[counter].push(tickets[i]);
        } else {
          ticks.push([tickets[i]]);
          counter++;
        }
      }
      expect(counter).toEqual(2);
  }) 
});