module.exports = class Routine {
  routineId;
  userId;
  tittle;
  privacy;
  description;
  exercisesInfo;
  timestamp;

  constructor(
    routineId = undefined,
    userId,
    tittle,
    privacy,
    description,
    exercisesInfo,
    timestamp = undefined
  ) {
    this.routineId = routineId;
    this.userId = userId;
    this.tittle = tittle;
    this.privacy = privacy;
    (this.description = description), (this.exercisesInfo = exercisesInfo);
    this.timestamp = timestamp;
  }

  get routineId() {
    return this.routineId;
  }

  set routineId(routineId) {
    this.routineId = routineId;
  }

  get userId() {
    return this.userId;
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

  get privacy() {
    return this.privacy;
  }

  set privacy(privacy) {
    this.privacy = privacy;
  }

  get description() {
    return this.description;
  }

  set description(description) {
    this.description = description;
  }

  get exercisesInfo() {
    return this.exercisesInfo;
  }

  set exercisesInfo(exercisesInfo) {
    this.exercisesInfo = exercisesInfo;
  }

  get timestamp() {
    return this.timestamp;
  }

  set timestamp(timestamp) {
    this.timestamp = timestamp;
  }
};
