const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  shipment_number: {
    type: String,
    trim: true,
  },
  hops: {
    type: [String],
  },
  flights: {
    type: [Object],
  },
});

const shipmentModel = mongoose.model("shipment", shipmentSchema);

module.exports = shipmentModel;
