const con = require("../config/mysql");

const remove = async (keyToRemove, valueToRemove) => {
  try {
    const query = `DELETE FROM favoriteWorkout WHERE ${keyToRemove} = ?;`;
    await con.query(query, [valueToRemove]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { remove };
