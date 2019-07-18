require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const ticket = require("../server/controller/ticketController");
const ticketFeat = ticket.getAllTickets;
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
  let empTickets = [];
  let counter = 0;
  afterAll(() => {
    connection.close();
    db.close();
  });
  it("should get tickets", done => {
    const req = {
      body: { restaurant: `curt's curts` }
    };
    const res = {
      send: function(data) {
        expect(data[0]).toEqual(expect.any(Object));
        done();
      },
      status(num) {
        expect(num).toEqual(200);
        return this;
      }
    };
    ticketFeat(req, res);
  });
  it("should not get tickets", done => {
    const req = {
      body: { restaurant: 1 }
    };
    const res = {
      send: function(data) {
        expect(data).toEqual("not a valid restaurant");
        done();
      },
      status(num) {
        expect(num).toEqual(404);
        return this;
      }
    };
    ticketFeat(req, res);
  });
  it("should return an array of ticket arrays", () => {
    counter = 0;
    // lines 155-164 BartenderView
    for (let i = 0; i < tickets.length; i++) {
      if (!empTickets[0]) {
        empTickets.push([tickets[i]]);
      } else if (tickets[i].ticketnum === empTickets[counter][0].ticketnum) {
        empTickets[counter].push(tickets[i]);
      } else {
        empTickets.push([tickets[i]]);
        counter++;
      }
    }
    expect(empTickets.length).toEqual(3);
  });
  it("should tick counter up to 2", () => {
    counter = 0;
    for (let i = 0; i < tickets.length; i++) {
      if (!empTickets[0]) {
        empTickets.push([tickets[i]]);
      } else if (tickets[i].ticketnum === empTickets[counter][0].ticketnum) {
        empTickets[counter].push(tickets[i]);
      } else {
        empTickets.push([tickets[i]]);
        counter++;
      }
    }
    expect(counter).toEqual(2);
  });
});
