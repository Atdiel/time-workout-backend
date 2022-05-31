const Routine = require("../pojos/routineEntity");
const RoutineDTO = require("../dtos/routineDto");

/**
 * > Convertir de DTO a Entity
 * @param {Object} routineDto
 * @returns // * Object @class Routine
 */
const toEntity = (routineDto) => {
  let { routineId, userId, tittle, privacy, description, exercisesInfo } =
    routineDto;

  if (privacy === true) {
    privacy = 1;
  } else {
    privacy = 0;
  }

  exercisesInfo = JSON.stringify(exercisesInfo);

  const routineEntity = new Routine(
    routineId,
    userId,
    tittle,
    privacy,
    description,
    exercisesInfo
  );

  return routineEntity;
};

/**
 * > Convertir de Entity a Dto
 * @param {Object} routineEntity
 * @returns // * Objeto @class RoutineDTO
 */
const toDto = (routineEntity) => {
  let {
    routineId,
    userId,
    tittle,
    privacy,
    description,
    exercisesInfo,
    timestamp,
    favorite,
  } = routineEntity;

  if (privacy === 1) {
    privacy = true;
  } else {
    privacy = false;
  }

  // > Desde la DB viene en formato String, lo pasamos a formato JSON
  exercisesInfo = JSON.parse(exercisesInfo).routines;

  // > convertir timestamp en string con el sig formato: yyyy-mm-dd.
  timestamp = timestamp.toISOString().split("T").shift();

  // > Util para consultas de rutinas publicas
  if (favorite === null) {
    favorite = false;
  } else if (favorite !== undefined) {
    favorite = true;
  }
  const routineDto = new RoutineDTO(
    routineId,
    userId,
    tittle,
    privacy,
    description,
    exercisesInfo,
    timestamp,
    favorite
  );

  return routineDto;
};

/**
 * > Convierte la lista de entidades en una lista mas clara para el usuario
 * @param {Array} routineEntityList
 * @returns // * Una lista de objetos
 */
const toDtoList = (routineEntityList) => {
  const routineDtoArray = [];
  for (var index in routineEntityList) {
    var routineDto = toDto(routineEntityList[index]);
    var jsonRoutineDto = { ...routineDto };
    routineDtoArray.push(jsonRoutineDto);
  }

  return routineDtoArray;
};

module.exports = { toEntity, toDto, toDtoList };
