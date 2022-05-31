module.exports = class ChallengeDTO {
  challengeId;
  userId;
  tittle;
  description;
  followers;
  startDate;
  endDate;
  days;
  timestamp;
  //> esta nueva propiedad solo sera definidad para challenges publicas
  favorite;

  constructor(
    challengeId,
    userId,
    tittle,
    description,
    followers,
    startDate,
    endDate,
    days,
    timestamp,
    favorite = undefined
  ) {
    this.challengeId = challengeId;
    this.userId = userId;
    this.tittle = tittle;
    this.description = description;
    this.followers = followers;
    this.startDate = startDate;
    this.endDate = endDate;
    this.days = days;
    this.timestamp = timestamp;
    this.favorite = favorite;
  }

  get challengeId() {
    return this.challengeId;
  }

  /**
   * @param {Number} challengeId
   */
  set challengeId(challengeId) {
    this.challengeId = challengeId;
  }

  get userId() {
    return this.userId;
  }

  /**
   * @param {Number} userId
   */
  set userId(userId) {
    this.userId = userId;
  }

  get tittle() {
    return this.tittle;
  }

  /**
   * @param {String} tittle
   */
  set tittle(tittle) {
    this.tittle = tittle;
  }

  get description() {
    return this.description;
  }

  /**
   * @param {String} description
   */
  set description(description) {
    this.description = description;
  }

  get followers() {
    return this.followers;
  }

  /**
   * @param {Number} followers
   */
  set followers(followers) {
    this.followers = followers;
  }

  get startDate() {
    return this.startDate;
  }

  /**
   * @param {String} startDate
   */
  set startDate(startDate) {
    this.startDate = startDate;
  }

  get endDate() {
    return this.endDate;
  }

  /**
   * @param {String} endDate
   */
  set endDate(endDate) {
    this.endDate = endDate;
  }

  get days() {
    return this.days;
  }

  /**
   * @param {JSON} days
   */
  set days(days) {
    this.days = days;
  }

  get timestamp() {
    return this.timestamp;
  }

  /**
   * @param {String} timestamp
   */
  set timestamp(timestamp) {
    this.timestamp = timestamp;
  }
};
