require("dotenv").config();
const express = require("express");
const cors = require("cors");
const loggerStream = require("./tools/loggerWebhook");
const morganBody = require("morgan-body");
const swaggerUI = require("swagger-ui-express");
const openAPIConfiguration = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * > Mandamos logs de errores a nuestro Webhook
 *
 */
morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});

/**
 * se usa el puerto definido en .env (default 3000)
 */
const port = process.env.PORT || 3000;

/**
 * route homepage
 */
app.get("/", (req, res) => {
  res.send("Welcome to Time-Workout Backend");
});

app.use("/docs/v1", swaggerUI.serve, swaggerUI.setup(openAPIConfiguration));

/**
 * usamos ./routes/index.js para manejar endpoints
 */
app.use("/api/v1", require("./routes/"));

app.listen(port, () => {
  console.log(`Corriendo servidor en puerto: ${port}`);
});
