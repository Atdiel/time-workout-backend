module.exports = class RecordDTO {
  recordId;
  userId;
  tittle;
  description;
  recordTable;
  timestamp;

  constructor(recordId, userId, tittle, description, recordTable, timestamp) {
    this.recordId = recordId;
    this.userId = userId;
    this.tittle = tittle;
    this.description = description;
    this.recordTable = recordTable;
    this.timestamp = timestamp;
  }

  get recordId() {
    return this.recordId;
  }

  set recordId(recordId) {
    this.recordId = recordId;
  }

  get userId() {
    return this.recordId;
  }

  set userId(userId) {
    this.userId = userId;
  }

  get tittle() {
    return this.tittle;
  }

  set tittle(tittle) {
    this.tittle = tittle;
  }

  get description() {
    return this.description;
  }

  set description(description) {
    this.description = description;
  }

  get recordTable() {
    return this.recordTable;
  }

  set recordTable(recordTable) {
    this.recordTable = recordTable;
  }

  get timestamp() {
    return this.timestamp;
  }

  set timestamp(timestamp) {
    this.timestamp = timestamp;
  }
};
