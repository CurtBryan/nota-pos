const ticket = require("../collections/ticket");

module.exports = {
  // gets all tickets made by a given employee
  getEmployeeTickets: (req, res, next) => {
    const { restaurant, employee } = req.body;
    ticket
      .find({ restaurant: restaurant, employee: employee, show: true })
      .sort({ ticketnum: -1 })
      .then(response => {
        res.status(200).send(response);
      });
  },
  // pull log of all tickets on the server
  getAllTickets: (req, res, next) => {
    const { restaurant } = req.body;
    // console.log("hit", req.body);
    ticket
      .find({ restaurant: restaurant }, { restaurant: 0 })
      .sort({ ticketnum: -1 })
      .then(response => {
        // console.log(response);
        res.status(200).send(response);
      })
      .catch(err => {
        // console.log(err);
        res.status(404).send("not a valid restaurant");
      });
  },
  // get whole single ticket (server or manager adjust)
  getFullTicket: (req, res, next) => {
    const { restaurant, ticketnum } = req.body;
    ticket
      .find(
        { restaurant: restaurant, ticketnum: ticketnum, show: true },
        { restaurant: 0, show: 0, drink: 0 }
      )
      .then(response => {
        res.status(200).send(response);
      });
  },
  // get food orders from tickets (kitchen view)
  getFoodTickets: (req, res, next) => {
    const { restaurant } = req.params;
    ticket
      .find(
        { restaurant: restaurant, drink: false, fulfilled: false },
        { restaurant: 0, show: 0, drink: 0 }
      )
      .sort({ ticketnum: -1 })
      .then(response => {
        res.status(200).send(response);
      });
  },
  // get drink orders from tickets (bar view)
  getDrinkTickets: (req, res, next) => {
    const { restaurant } = req.params;
    ticket
      .find(
        { restaurant: restaurant, drink: true, fulfilled: false },
        { restaurant: 0, show: 0, drink: 0 }
      )
      .sort({ ticketnum: -1 })
      .then(response => {
        res.status(200).send(response);
      });
  },
  // post a new ticket item (for loop in front posts whole ticket)
  postTicket: (req, res, next) => {
    console.log(req.body);
    const {
      restaurant,
      employee,
      tablenum,
      itemnum,
      item,
      itemprice,
      mod,
      ticketnum,
      drink
    } = req.body;
    const newTick = new ticket({
      restaurant: restaurant,
      employee: employee,
      tablenum: tablenum,
      itemnum: itemnum,
      item: item,
      itemprice: itemprice,
      mod: mod,
      ticketnum: ticketnum,
      ticketsplit: 1,
      drink: drink,
      date: Date.now(),
      fulfilled: false,
      show: true
    });
    newTick.save().then(() => res.status(200).send("ticket sent"));
  },
  // edit ticket fields, including table transfers and server
  // transfers
  editTicket: (req, res, next) => {
    const {
      restaurant,
      tablenum,
      itemnum,
      item,
      itemprice,
      mod,
      ticketnum,
      ticketsplit,
      employee,
      newtable
    } = req.body;
    ticket
      .findOne({
        restaurant: restaurant,
        tablenum: tablenum,
        ticketnum: ticketnum,
        item: item,
        show: true
      })
      .then(record => {
        record.tablenum = newtable;
        record.itemnum = itemnum;
        record.itemprice = itemprice;
        record.mod = mod;
        record.ticketsplit = ticketsplit;
        record.employee = employee;
        record.save().then(() => {
          ticket
            .find(
              { restaurant: restaurant, employee: employee },
              { restaurant: 0 }
            )
            .then(response => {
              res.status(200).send(response);
            });
        });
      });
  },
  // marks a ticket by food or drink as completed on the bar/kitchen side
  fulfillTicket: (req, res, next) => {
    const { restaurant, ticketnum, drink } = req.body;
    ticket
      .find({ restaurant: restaurant, ticketnum: ticketnum, drink: drink })
      .then(record => {
        record.forEach(element => {
          element.fulfilled = true;
          element.save();
        });
      })
      .then(() => {
        ticket.find({ restaurant: restaurant, ticketnum: ticketnum });
      })
      .then(response => {
        res.status(200).send(response);
      });
  },
  // set show to false "printing" ticket
  printTicket: (req, res, next) => {
    const { restaurant, tablenum, ticketnum } = req.body;
    ticket
      .find({
        restaurant: restaurant,
        tablenum: tablenum,
        ticketnum: ticketnum
      })
      .then(record => {
        record.forEach(element => {
          element.show = false;
          element.save();
        });
      })
      .then(() => {
        res.status(200).send("ticket printed");
      });
  },
  getLatestTicketNum: (req, res, next) => {
    const { restaurant } = req.params;
    ticket
      .find({ restaurant: restaurant }, { ticketnum: 1 })
      .sort({ ticketnum: -1 })
      .then(response => {
        // console.log(response);
        res.status(200).send(response[0]);
      });
  }
};
