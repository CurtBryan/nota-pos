const ticket = require("../collections/ticket");

module.exports = {
  // pull log of all tickets on the server
  getAllTickets: (req, res, next) => {
    const { restaurant } = req.body;
    ticket
      .find({ restaurant: restaurant }, { restaurant: 0 })
      .then(response => {
        res.status(200).send(response);
      });
  },
  // get whole single ticket (server or manager adjust)
  getFullTicket: (req, res, next) => {
    const { restaurant, tablenum } = req.body;
    ticket
      .find(
        { restaurant: restaurant, tablenum: tablenum, show: true },
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
        { restaurant: restaurant, drink: false, show: true },
        { restaurant: 0, show: 0, drink: 0 }
      )
      .then(response => {
        res.status(200).send(response);
      });
  },
  // get drink orders from tickets (bar view)
  getDrinkTickets: (req, res, next) => {
    const { restaurant } = req.params;
    ticket
      .find(
        { restaurant: restaurant, drink: true, show: true },
        { restaurant: 0, show: 0, drink: 0 }
      )
      .then(response => {
        res.status(200).send(response);
      });
  },
  // post a new ticket item (for loop in front posts whole ticket)
  postTicket: (req, res, next) => {
    const {
      restaurant,
      employee,
      tablenum,
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
      item: item,
      itemprice: itemprice,
      mod: mod,
      ticketnum: ticketnum,
      drink: drink,
      date: Date.now(),
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
      item,
      itemprice,
      mod,
      ticketnum,
      employee,
      newitem,
      newtable
    } = req.body;
    ticket
      .findOne({
        restaurant: restaurant,
        tablenum: tablenum,
        item: item,
        show: true
      })
      .then(record => {
        record.tablenum = newtable;
        record.item = newitem;
        record.itemprice = itemprice;
        record.mod = mod;
        record.ticketnum = ticketnum;
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
  // set show to false "printing" ticket
  printTicket: (req, res, next) => {
    const { restaurant, tablenum } = req.body;
    ticket
      .find({ restaurant: restaurant, tablenum: tablenum })
      .then(record => {
        record.forEach(element => {
          element.show = false;
          element.save();
        });
      })
      .then(() => {
        res.status(200).send("ticket printed");
      });
  }
};
