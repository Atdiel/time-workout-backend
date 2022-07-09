const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * > Sign token with user data and backend secret.
 * @param {JSON} userObject user DTO Object in JSON format.
 * @returns {Promise<String>} new token generated.
 */
const signToken = (userObject) => {
  return new Promise((resolve, reject) => {
    try {
      const token = jwt.sign(
        {
          _id: userObject.userId,
          name: userObject.name,
        },
        JWT_SECRET
      );

      resolve(token);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * > Verify that the token has been signed on this server.
 * @param {String} tokenJwt A Json Web Token given.
 * @returns {Promise<JSON>} The decoded token
 */
const verifyToken = (tokenJwt) => {
  return new Promise((resolve, reject) => {
    try {
      const decodedToken = jwt.verify(tokenJwt, JWT_SECRET);

      resolve(decodedToken);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { signToken, verifyToken };
