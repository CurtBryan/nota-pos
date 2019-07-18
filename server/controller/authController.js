const bcrypt = require("bcrypt");
const Restaurant = require("../collections/restaurant");

module.exports = {
  login: (req, res, next) => {
    const { typedEmail, typedPassword } = req.body;
    Restaurant.find({ email: typedEmail })
      .then(restaurant => {
        bcrypt
          .compare(typedPassword, restaurant[0].password)
          .then(matchedPassword => {
            if (matchedPassword) {
              req.session.user = restaurant[0].name;
              console.log(req.session.user);
              res.status(200).send(req.session.user);
            } else {
              res.status(401).send("incorrect info mang");
            }
          });
      })
      .catch(err => {
        console.log(err);
        res.status(401).send("incorrect info mang");
      });
  },
  register: (req, res, next) => {
    const { typedName, typedEmail, typedPassword } = req.body;
    const saltRounds = 12;
    bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        bcrypt.hash(typedPassword, salt).then(hashedPassword => {
          const restaurant = new Restaurant({
            name: typedName,
            email: typedEmail,
            password: hashedPassword
          });
          restaurant.save(err => {
            if (err) {
              res
                .status(400)
                .send("there was an error on the server", console.log(err));
            }
            Restaurant.find({ email: typedEmail }).then(restaurant => {
              req.session.user = restaurant[0].name;
              res.status(200).send(req.session.user);
            });
          });
        });
      })
      .catch(err => console.log(err));
  },
  userInfo: (req, res, next) => {
    res.status(200).send(req.session.user);
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send("logged out");
  }
};
