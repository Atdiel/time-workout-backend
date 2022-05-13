const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * firmar token con datos del usuario y secret del backend @constant JWT_SECRET
 * @param {*} userObject usuario
 * @returns token: string
 */
const signToken = async (userObject) => {
  const token = jwt.sign(
    {
      _id: userObject.userId,
      name: userObject.name,
    },
    JWT_SECRET
  );

  return token;
};

/**
 * verificar que el token se firmo en esta PC
 * @param {*} tokenJwt
 * @returns
 */
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { signToken, verifyToken };
