const ticket = require("../collections/ticket");

module.exports = {
  //get whole single ticket (server or manager adjust)
  getFullTicket: (req, res, next) => {
    const { restaurant, tablenum } = req.body;
    ticket
      .findOne(
        { restaurant: restaurant, tablenum: tablenum },
        { restaurant: 0 }
      )
      .then(response => {
        res.status(200).send(response);
      });
  },
  // get food orders from tickets (kitchen view)
  getFoodTickets: (req, res, next) => {
    const { restaurant } = req.params;
    ticket
      .find({ restaurant: restaurant, drink: false }, { restaurant: 0 })
      .then(response => {
        res.status(200).send(response);
      });
  },
  // get drink orders from tickets (bar view)
  getDrinkTickets: (req, res, next) => {
    const { restaurant } = req.params;
    ticket
      .find({ restaurant: restaurant, drink: true }, { restaurant: 0 })
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
      drink: drink
    });
    newTick.save();
  },
  editTicket: (req, res, next) => {
      const {restaurant, tablenum, item} = req.body
      ticket.findOne({restaurant: restaurant, tablenum: tablenum, item: item}).then(record => {
          record.
      })
  },
  deleteTicket: {}
};
