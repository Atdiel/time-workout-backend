const Tabata = require("../pojos/tabataEntity");
const TabataDto = require("../dtos/tabataDto");

/**
 * > Convertir de DTO a Entity
 * @param {Object} tabataDTO
 * @returns // * Object @class Tabata
 */
const toEntity = (tabataDTO) => {
  let {
    tabataId,
    userId,
    tittle,
    privacy,
    description,
    effortTime,
    rounds,
    restTime,
    exercises,
  } = tabataDTO;

  if (privacy === true) {
    privacy = 1;
  } else {
    privacy = 0;
  }

  exercises = JSON.stringify(exercises);

  const tabataEntity = new Tabata(
    tabataId,
    userId,
    tittle,
    privacy,
    description,
    effortTime,
    rounds,
    restTime,
    exercises
  );

  return tabataEntity;
};

/**
 * > Convertir de Entity a Dto
 * @param {Object} tabataEntity
 * @returns // * Objeto @class TabataDto
 */
const toDto = (tabataEntity) => {
  let {
    tabataId,
    userId,
    tittle,
    privacy,
    description,
    effortTime,
    rounds,
    restTime,
    exercises,
    timestamp,
    favorite,
  } = tabataEntity;

  if (privacy === 1) {
    privacy = true;
  } else {
    privacy = false;
  }

  // > exercises viene de la DB: '{"exercises": ["3 lagartijas", " 4 sentadillas"]}'.
  // > luego se convierte en lista: [ '3 lagartijas', ' 4 sentadillas' ].
  exercises = JSON.parse(exercises).exercises;

  // > convertir timestamp en string con el sig formato: yyyy-mm-dd.
  timestamp = timestamp.toISOString().split("T").shift();

  // > Util para consultas de tabatas publicas
  if (favorite === null) {
    favorite = false;
  } else if (favorite !== undefined) {
    favorite = true;
  }
  const tabataDto = new TabataDto(
    tabataId,
    userId,
    tittle,
    privacy,
    description,
    effortTime,
    rounds,
    restTime,
    exercises,
    timestamp,
    favorite
  );

  return tabataDto;
};

/**
 * > Convierte la lista de entidades en una lista mas clara para el usuario
 * @param {Array} tabataEntityList
 * @returns // * Una lista de objetos
 */
const toDtoList = (tabataEntityList) => {
  const tabataDtoArray = [];
  for (var index in tabataEntityList) {
    var tabataDto = toDto(tabataEntityList[index]);
    var jsonTabataDto = { ...tabataDto };
    tabataDtoArray.push(jsonTabataDto);
  }

  return tabataDtoArray;
};

module.exports = { toEntity, toDto, toDtoList };
