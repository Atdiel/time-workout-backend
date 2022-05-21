const express = require("express");
const fs = require("fs");
const router = express.Router();

/**
 * constante que define la ruta absoluta actual de este fichero
 */
const PATH_ROUTES = __dirname;

/**
 * removemos la extension de fichero ruta ej: index.js -> index
 * @param {*} filename
 * @returns
 */
const removeExtension = (filename) => {
  return filename.split(".").shift();
};

/**
 * leemos las rutas dinamicamente -> router.use("/ruta", require("ruta"))
 */
fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);
  if (name !== "index") {
    router.use(`/${name}`, require(`./${file}`));
  }
});

module.exports = router;
