const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
<<<<<<< HEAD
=======
  title: String,
>>>>>>> 4bd31ba6ad8858e0e64c61c682c771f3b766001e
  picture: String,
  description: String,
  categoty: String,
  dateEvent: String
});


const Event = mongoose.model("event", eventSchema);

module.exports = Event;
