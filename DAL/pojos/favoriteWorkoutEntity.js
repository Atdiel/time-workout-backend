module.exports = class FavoriteWorkout {
  favoriteWorkoutId;
  userId;
  tabataId;
  routineId;
  challengeId;

  constructor(
    userId,
    favoriteWorkoutId = undefined,
    tabataId = undefined,
    routineId = undefined,
    challengeId = undefined
  ) {
    this.userId = userId;
    this.favoriteWorkoutId = favoriteWorkoutId;
    this.tabataId = tabataId;
    this.routineId = routineId;
    this.challengeId = challengeId;
  }

  get userId() {
    return this.userId;
  }

  set userId(userId) {
    this.userId = userId;
  }

  get favoriteWorkoutId() {
    return this.favoriteWorkoutId;
  }

  set favoriteWorkoutId(favoriteWorkoutId) {
    this.favoriteWorkoutId = favoriteWorkoutId;
  }

  get tabataId() {
    return this.tabataId;
  }

  set tabataId(tabataId) {
    this.tabataId = tabataId;
  }

  get routineId() {
    return this.routineId;
  }

  set routineId(routineId) {
    this.routineId = routineId;
  }

  get challengeId() {
    return this.challengeId;
  }

  set challengeId(challengeId) {
    this.challengeId = challengeId;
  }
};
