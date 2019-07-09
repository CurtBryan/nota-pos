const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email) {
        const validEmail = email.includes("@");
        return validEmail;
      }
    }
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("restaurant", restaurantSchema);
