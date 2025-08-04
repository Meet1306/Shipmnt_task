const shipmentModel = require("../models/shipment");

const createShipment = async (req, res) => {
  try {
    const { shipment_number, origin, destination } = req.body;
    if (!shipment_number || !origin || !destination) {
      throw new Error("Details not found");
    }

    const currHops = [origin, destination];

    const shipmentDetails = new shipmentModel({
      shipment_number,
      hops: currHops,
    });

    await shipmentDetails.save();

    res.status(201).json({
      success: true,
      message: "Shipment created successfully.",
      data: {
        shipment_number,
        hops: currHops,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Origin and destination are required fields.",
    });
  }
};

const handleAddHops = async (req, res) => {
  try {
    const shipment_number = req.params.shipment_number;
    const { previous_hop, next_hop, new_hop } = req.body;
    if (!previous_hop || !next_hop || !new_hop) {
      throw new Error("Details not found");
    }

    const shipDoc = await shipmentModel.findOne({ shipment_number });
    if (!shipDoc) {
      throw new Error("Shipment with ID not found.");
    }

    const hops = shipDoc.hops;
    let n = hops.length;
    for (let i = 0; i < n; i++) {
      if (hops[i] === previous_hop) {
        if (i + 1 < n && hops[i + 1] === next_hop) {
          hops.splice(i + 1, 0, new_hop);
        }
        //see for error
      }
    }

    shipDoc.hops = hops;
    await shipDoc.save();

    // console.log(hops);
    res.json({
      success: true,
      message: "Hop added successfully.",
      data: {
        shipment_number: shipDoc.shipment_number,
        hops,
      },
    });
  } catch (err) {
    res.json({ success: false, message: err.message });

    // res.json({
    //   success: false,
    //   message: "Shipment with ID not found.",
    // });
  }
};

const handleAddFlight = async (req, res) => {
  try {
    const shipment_number = req.params.shipment_number;
    const body = req.body;
    if (!body) {
      throw new Error("Details not found");
    }

    const prev = body.from;
    const nxt = body.to;

    const shipDoc = await shipmentModel.findOne({ shipment_number });
    if (!shipDoc) {
      throw new Error("Shipment with ID not found.");
    }

    const hops = shipDoc.hops;
    console.log("Hops: ", hops);

    let n = hops.length;

    let flag = 0;

    for (let i = 0; i < n; i++) {
      if (hops[i] === prev && i + 1 < n && hops[i + 1] === nxt) {
        console.log(i);

        flag = 1;
        break;
      }
    }
    if (!flag) {
      throw new Error("Not consecutive Hops");
    }

    const currFlights = shipDoc.flights;
    currFlights.push(body);

    console.log(currFlights);

    shipDoc.flights = currFlights;

    await shipDoc.save();

    res.json({
      success: true,
      message: "Flight information added successfully.",
      data: {
        shipment_number: shipDoc.shipment_number,
        flight_number: body.flight_number,
        flight_path: body.flight_path,
        departure: body.departure,
        arrival: body.arrival,
        status: "in-transit",
      },
    });
  } catch (err) {
    // res.json({ error: err.message });
    res.json({
      success: false,
      message:
        "Unable to add a flight. The 'from' and 'to' locations are not consecutive hops for this shipment.",
    });
  }
};

module.exports = { createShipment, handleAddHops, handleAddFlight };
