const mongooose = require("mongoose");

const employee = new mongoose.Schema({
  restaurant: {
    type: String,
    required: true
  },
  pin: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  }
});

module.exports = mogoose.model("employee", employeeSchema);
