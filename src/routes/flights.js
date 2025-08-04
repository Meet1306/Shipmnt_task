const express = require("express");
const flightRouter = express.Router();

const { handleAddFlight } = require("../controllers/flight");

flightRouter.put("/:flight_number/status", handleAddFlight);

module.exports = flightRouter;
