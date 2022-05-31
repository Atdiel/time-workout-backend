const Record = require("../pojos/recordEntity");
const RecordDTO = require("../dtos/recordDto");

/**
 * > Convertir de DTO a Entity
 * @param {Object} recordDto
 * @returns // * Object @class Record
 */
const toEntity = (recordDto) => {
  let { recordId, userId, tittle, description, recordTable } = recordDto;

  recordTable = JSON.stringify(recordTable);

  const recordEntity = new Record(
    recordId,
    userId,
    tittle,
    description,
    recordTable
  );

  return recordEntity;
};

/**
 * > Convertir de Entity a Dto
 * @param {Object} recordEntity
 * @returns // * Objeto @class RecordDTO
 */
const toDto = (recordEntity) => {
  let { recordId, userId, tittle, description, recordTable, timestamp } =
    recordEntity;

  // > Desde la DB viene en formato String, lo pasamos a formato JSON
  recordTable = JSON.parse(recordTable).records;

  // > convertir timestamp en string con el sig formato: yyyy-mm-dd.
  timestamp = timestamp.toISOString().split("T").shift();

  const recordDto = new RecordDTO(
    recordId,
    userId,
    tittle,
    description,
    recordTable,
    timestamp
  );

  return recordDto;
};

/**
 * > Convierte la lista de entidades en una lista mas clara para el usuario
 * @param {Array} recordEntityList
 * @returns // * Una lista de objetos
 */
const toDtoList = (recordEntityList) => {
  const recordDtoList = [];
  for (var index in recordEntityList) {
    var recordDto = toDto(recordEntityList[index]);
    var jsonRecordDto = { ...recordDto };
    recordDtoList.push(jsonRecordDto);
  }

  return recordDtoList;
};

module.exports = { toEntity, toDto, toDtoList };
