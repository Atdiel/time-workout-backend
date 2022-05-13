require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * se usa el puerto definido en .env (default 3000)
 */
const port = process.env.EXPRESS_PORT || 3000;

/**
 * route homepage
 */
app.route("/", (req, res) => {
  res.send("Welcome to Time-Workout Backend");
});

/**
 * usamos ./routes/index.js para manejar endpoints
 */
app.use("/api/v1", require("./routes/"));

app.listen(port, () => {
  console.log(`Corriendo servidor en puerto: ${port}`);
});
