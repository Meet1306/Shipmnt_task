const express = require("express");
const {
  createShipment,
  handleAddHops,
  handleAddFlight,
} = require("../controllers/shipments");

const shipmentRouter = express.Router();

shipmentRouter.post("/create", createShipment);
shipmentRouter.post("/:shipment_number/hops/add", handleAddHops);
shipmentRouter.post("/:shipment_number/flights/add", handleAddFlight);

module.exports = shipmentRouter;
