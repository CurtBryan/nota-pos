const employee = require("../collections/employee");

module.exports = {
  // pulls employee by pin
  getCurrentEmployee: (req, res, next) => {
    const { restaurant, pin } = req.body;
    employee
      .findOne({ restaurant: restaurant, pin: pin })
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => res.status(500).send("Incorrect Pin"));
  },
  // pulls complete restaurant employee list
  getEmployees: (req, res, next) => {
    const { restaurant } = req.params;
    console.log(restaurant);
    employee
      .find({ restaurant: restaurant }, { name: 1, pin: 1, position: 1 })
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => console.log(err));
  },
  // posts new employee to a given restaurant
  postEmployee: (req, res, next) => {
    const { restaurant, name, position, pin } = req.body;
    console.log(req.body);
    const emp = new employee({
      restaurant: restaurant,
      pin: pin,
      name: name,
      position: position
    });
    emp.save().then(() => {
      employee
        .find({ restaurant: restaurant }, { name: 1, pin: 1, position: 1 })
        .then(response => {
          res.status(200).send(response);
        });
    });
  },
  // update an employee's pin and position
  updateEmployee: (req, res, next) => {
    const { restaurant, pin, newpin, newpos } = req.body;
    employee.findOne({ restaurant: restaurant, pin: pin }).then(record => {
      record.pin = newpin;
      record.position = newpos;
      record.save().then(() => {
        employee
          .find({ restaurant: restaurant }, { name: 1, pin: 1, position: 1 })
          .then(response => {
            res.status(200).send(response);
          });
      });
    });
  },
  // deletes an employee by pin number
  deleteEmployee: (req, res, next) => {
    const { restaurant, pin } = req.query;
    console.log(req.body);
    employee.remove({ restaurant: restaurant, pin: pin }).then(() => {
      employee
        .find({ restaurant: restaurant }, { name: 1, pin: 1, position: 1 })
        .then(response => {
          res.status(200).send(response);
        });
    });
  }
};
