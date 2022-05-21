module.exports = class Tabata {
  tabataId;
  userId;
  tittle;
  privacy;
  description;
  effortTime;
  rounds;
  restTime;
  exercises;
  timestamp;

  constructor(
    tabataId = undefined,
    userId,
    tittle,
    privacy,
    description,
    effortTime,
    rounds,
    restTime,
    exercises,
    timestamp = undefined
  ) {
    this.tabataId = tabataId;
    this.userId = userId;
    this.tittle = tittle;
    this.privacy = privacy;
    this.description = description;
    this.effortTime = effortTime;
    this.rounds = rounds;
    this.restTime = restTime;
    this.exercises = exercises;
    this.timestamp = timestamp;
  }

  get tabataId() {
    return this.tabataId;
  }

  set tabataId(tabataId) {
    this.tabataId = tabataId;
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

  get effortTime() {
    return this.effortTime;
  }

  set effortTime(effortTime) {
    this.effortTime = effortTime;
  }

  get rounds() {
    return this.rounds;
  }

  set rounds(rounds) {
    this.rounds = rounds;
  }

  get restTime() {
    return this.restTime;
  }

  set restTime(restTime) {
    this.restTime = restTime;
  }

  get exercises() {
    return this.exercises;
  }

  set exercises(exercises) {
    this.exercises = exercises;
  }

  get timestamp() {
    return this.timestamp;
  }

  set timestamp(timestamp) {
    this.timestamp = timestamp;
  }
};
