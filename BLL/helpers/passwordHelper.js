const bcryptjs = require("bcryptjs");
const saltOrRounds = 10;

/**
 * Encriptar contraseña en texto plano
 * @param {*} plainPassword
 * @returns
 */
const hashPassword = async (plainPassword) => {
  return await bcryptjs.hash(plainPassword, saltOrRounds);
};

/**
 * Comparar una contraseña plana y una encriptada.
 * @param {*} plainPassword
 * @param {*} hashedPassword
 * @returns
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcryptjs.compare(plainPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
