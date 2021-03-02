const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  picture: String,
  description: String
});

const Event = mongoose.model("event", eventSchema);

module.exports = Event;
