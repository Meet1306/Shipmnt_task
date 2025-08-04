const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");
const shipmentRouter = require("./src/routes/shipments");
const flightRouter = require("./src/routes/flights");
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.use("/shipments", shipmentRouter);
app.use("/flights", flightRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server listening on http://localhost:${PORT}/`);
});
