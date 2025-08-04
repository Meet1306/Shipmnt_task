const shipmentModel = require("../models/shipment");

const handleAddFlight = (req, res) => {
  try {
    const flight_number = req.params.flight_number;
    const { status } = req.body;

    const shipDoc = shipmentModel.findOne({ flights: [{ flight_number }] });
    
      
    // console.log(shipDoc);
    res.json({ msg: "" });
  } catch (err) {
    res.json(err);
  }
};

module.exports = { handleAddFlight };
