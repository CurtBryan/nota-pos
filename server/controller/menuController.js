const menu = require("../collections/menu");
module.exports = {
  // pulls whole menu by restaurant name
  getRestaurantMenu: (req, res, next) => {
    const { restaurant } = req.params;
    menu
      .find({ restaurant: restaurant }, { division: 1, items: 1 })
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => console.log(err));
  },
  // posts a new header section and a new item
  postDivision: (req, res, next) => {
    const { restaurant, division, item, drink } = req.body;
    const div = new menu({
      restaurant: restaurant,
      division: division,
      items: item,
      drink: drink
    });
    div.save().then(() => {
      menu
        .find({ restaurant: restaurant }, { division: 1, items: 1 })
        .then(response => {
          res.status(200).send(response);
        });
    });
  },
  // edits headers
  updateDivisions: (req, res, next) => {
    const { restaurant, division, newdiv } = req.body;
    menu
      .findOne({ restaurant: restaurant, division: division })
      .then(record => {
        record.division = newdiv;
        record.save().then(() => {
          menu
            .find({ restaurant: restaurant }, { division: 1, items: 1 })
            .then(response => {
              res.status(200).send(response);
            });
        });
      });
  },
  // removes a header and all objects within it
  deleteDivision: (req, res, next) => {
    const { restaurant, division } = req.body;
    menu.remove({ restaurant: restaurant, division: division }).then(() => {
      menu
        .find({ restaurant: restaurant }, { division: 1, items: 1 })
        .then(response => {
          res.status(200).send(response);
        });
    });
  },
  // adds an item to a division
  postItem: (req, res, next) => {
    const { restaurant, division, item, price, drink } = req.body;
    console.log(req.body);
    menu
      .findOne({ restaurant: restaurant, division: division })
      .then(record => {
        console.log(record);
        record.items.push({ item: item, price: price, drink: drink });
        record.save().then(() => {
          menu
            .find({ restaurant: restaurant }, { division: 1, items: 1 })
            .then(response => {
              res.status(200).send(response);
            });
        });
      })
      .catch(err => console.log(err));
  },
  // updates one item under a given division
  updateItem: (req, res, next) => {
    const { restaurant, division, price, index } = req.body;
    menu
      .findOne({ restaurant: restaurant, division: division })
      .then(record => {
        record.items[index].price = price;
        record.save().then(() => {
          menu
            .find({ restaurant: restaurant }, { division: 1, items: 1 })
            .then(response => {
              res.status(200).send(response);
            });
        });
      });
  },
  // removes a single item
  deleteItem: (req, res, next) => {
    const { restaurant, division, index } = req.body;
    menu
      .findOne({ restaurant: restaurant, division: division })
      .then(record => {
        record.items.splice(index - 1, 1);
        record.save().then(() => {
          menu
            .find({ restaurant: restaurant }, { division: 1, items: 1 })
            .then(response => {
              res.status(200).send(response);
            });
        });
      });
  }
};
