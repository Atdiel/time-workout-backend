const bcryptjs = require("bcryptjs");
const saltOrRounds = 10;

/**
 * > Encrypt password.
 * @param {String} plainPassword Password in text plain.
 * @returns {Promise<String>} Password encrypted.
 */
const hashPassword = async (plainPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashResulting = await bcryptjs.hash(plainPassword, saltOrRounds);

      resolve(hashResulting);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > Compare a password in text plain against an encrypted.
 * @param {String} plainPassword
 * @param {String} hashedPassword
 * @returns {Promise}
 */
const comparePassword = (plainPassword, hashedPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await bcryptjs.compare(plainPassword, hashedPassword);

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { hashPassword, comparePassword };
