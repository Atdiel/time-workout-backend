module.exports = class User {
  userId;
  name;
  lastName;
  password;
  email;
  gender;
  birthday;
  profilePicture;
  nationality;
  timestamp;

  constructor(
    userId = undefined,
    name,
    lastName,
    password,
    email,
    gender,
    birthday,
    profilePicture,
    nationality,
    timestamp = undefined
  ) {
    this.userId = userId;
    this.name = name;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.gender = gender;
    this.birthday = birthday;
    this.profilePicture = profilePicture;
    this.nationality = nationality;
    this.timestamp = timestamp;
  }

  get userId() {
    return this.userId;
  }

  set userId(userId) {
    this.userId = userId;
  }

  get name() {
    return this.name;
  }

  set name(name) {
    this.name = name;
  }

  get lastName() {
    return this.lastName;
  }

  set lastName(lastName) {
    this.lastName = lastName;
  }

  get password() {
    return this.password;
  }

  set password(password) {
    this.password = password;
  }

  get email() {
    return this.email;
  }

  set email(email) {
    this.email = email;
  }

  get gender() {
    return this.gender;
  }

  set gender(gender) {
    this.gender = gender;
  }

  get birthday() {
    return this.birthday;
  }

  set birthday(birthday) {
    this.birthday = birthday;
  }

  get profilePicture() {
    return this.profilePicture;
  }

  set profilePicture(profilePicture) {
    this.profilePicture = profilePicture;
  }

  get nationality() {
    return this.nationality;
  }

  set nationality(nationality) {
    this.nationality = nationality;
  }

  get timestamp() {
    return this.timestamp;
  }

  set timestamp(timestamp) {
    this.timestamp = timestamp;
  }
};
