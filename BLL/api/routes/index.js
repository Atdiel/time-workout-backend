const express = require("express");
const fs = require("fs");
const router = express.Router();

const ROUTES_DIR = __dirname;

/**
 * > Remove extension from a given filename.
 * @param {String} filename
 * @returns {String} The filename without extension.
 */
const removeExtension = (filename) => {
  return filename.split(".").shift();
};

//> dynamic reading for all API's routes.
fs.readdirSync(ROUTES_DIR).filter((filename) => {
  const routeName = removeExtension(filename);

  if (routeName !== "index") {
    router.use(`/${routeName}`, require(`./${filename}`));
  }
});

module.exports = router;
