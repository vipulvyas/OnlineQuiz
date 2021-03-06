const mongoose = require("mongoose");
const schema = mongoose.Schema;
// add role for Admin and quiz user
const ROLE = {
  Admin: 1,
  Quiz: 2
}
const userSchema = new schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 225,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 225,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 225,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("userdata", userSchema);
