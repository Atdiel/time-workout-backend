const Challenge = require("../pojos/challengeEntity");
const ChallengeDTO = require("../dtos/challengeDto");

/**
 * > Convertir de DTO a Entity
 * @param {Object} challengeDto
 * @returns // * Object: Challenge
 */
const toEntity = (challengeDto) => {
  let {
    challengeId,
    userId,
    tittle,
    description,
    followers,
    startDate,
    endDate,
    days,
  } = challengeDto;

  if (followers === undefined) {
    followers = 0;
  }

  days = JSON.stringify(days);

  const challengeEntity = new Challenge(
    challengeId,
    userId,
    tittle,
    description,
    followers,
    startDate,
    endDate,
    days
  );

  return challengeEntity;
};

/**
 * > Convertir de Entity a Dto
 * @param {Object} challengeEntity
 * @returns // * Objeto: ChallengeDTO
 */
const toDto = (challengeEntity) => {
  let {
    challengeId,
    userId,
    tittle,
    description,
    followers,
    startDate,
    endDate,
    days,
    timestamp,
    favorite,
  } = challengeEntity;

  // > Desde la DB viene en formato String, lo pasamos a formato JSON
  days = JSON.parse(days).days;

  // > convertir fechas en string con el sig formato: yyyy-mm-dd.
  timestamp = timestamp.toISOString().split("T").shift();
  startDate = startDate.toISOString().split("T").shift();
  endDate = endDate.toISOString().split("T").shift();

  // > Util para consultas de rutinas publicas
  if (favorite === null) {
    favorite = false;
  } else if (favorite !== undefined) {
    favorite = true;
  }
  const challengeDto = new ChallengeDTO(
    challengeId,
    userId,
    tittle,
    description,
    followers,
    startDate,
    endDate,
    days,
    timestamp,
    favorite
  );

  return challengeDto;
};

/**
 * > Convierte la lista de entidades en una lista mas clara para el usuario
 * @param {Array} challengeEntityList
 * @returns // * Una lista de objetos
 */
const toDtoList = (challengeEntityList) => {
  const challengeDtoArray = [];
  for (var index in challengeEntityList) {
    var challengeDto = toDto(challengeEntityList[index]);
    var jsonChallengeDto = { ...challengeDto };
    challengeDtoArray.push(jsonChallengeDto);
  }

  return challengeDtoArray;
};

module.exports = { toEntity, toDto, toDtoList };
