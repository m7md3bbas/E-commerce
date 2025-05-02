class User {
  #id;
  #name;
  #email;
  #password;
  #address;
  #type;
  #gender;
  #date_of_birth;
  #listen;
  #phone;
  #image;

  constructor(
    id,
    name,
    email,
    password,
    address,
    gender,
    date_of_birth,
    listen,
    phone,
    image,
    type
  ) {
    // if (new.target.name === "User") {
    //   throw new Error(
    //     "Abstract Class, you can't create an instance of User directly!"
    //   );
    // }

    this.#id = id;
    this.setName(name);
    this.setEmail(email);
    this.setPassword(password);
    this.setAddress(address);
    this.setGender(gender);
    this.setDateOfBirth(date_of_birth);
    this.setListen(listen);
    this.setPhone(phone);
    this.setImage(image);
    this.setType(type);
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }
  setName(name) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Name must be a non-empty string.");
    }
    this.#name = name;
  }

  getType() {
    return this.#type;
  }
  setType(type) {
    if (type !== "seller" && type !== "user") {
      throw new Error("Type must be either 'seller' or 'user'.");
    }
    this.#type = type;
  }

  getEmail() {
    return this.#email;
  }
  setEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }
    this.#email = email;
  }

  getPassword() {
    return this.#password;
  }
  setPassword(password) {
    if (typeof password !== "string" || password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }
    this.#password = password;
  }

  getAddress() {
    return this.#address;
  }
  setAddress(address) {
    if (typeof address !== "string" || address.trim() === "") {
      throw new Error("Address must be a non-empty string.");
    }
    this.#address = address;
  }

  getGender() {
    return this.#gender;
  }
  setGender(gender) {
    const validGenders = ["male", "female", "other"];
    if (!validGenders.includes(gender.toLowerCase())) {
      throw new Error('Gender must be "male", "female", or "other".');
    }
    this.#gender = gender;
  }

  getDateOfBirth() {
    return this.#date_of_birth;
  }
  setDateOfBirth(date) {
    const dob = new Date(date);
    if (isNaN(dob.getTime())) {
      throw new Error("Invalid date of birth.");
    }
    this.#date_of_birth = dob.toISOString().split("T")[0];
  }

  getListen() {
    return this.#listen;
  }
  setListen(listen) {
    this.#listen = listen;
  }

  getPhone() {
    return this.#phone;
  }
  setPhone(phone) {
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error("Invalid phone number format.");
    }
    this.#phone = phone;
  }

  getImage() {
    return this.#image;
  }
  setImage(image) {
    if (typeof image !== "string" || image.trim() === "") {
      throw new Error("Image must be a non-empty string URL.");
    }
    this.#image = image;
  }
}

// --- User Management ---
let users = [];

export const pushUser = function (
  id,
  name,
  email,
  password,
  address,
  gender,
  date_of_birth,
  listen,
  phone,
  image,
  type
) {
  // class ConcreteUser extends User {}
  const user = new User(
    id,
    name,
    email,
    password,
    address,
    gender,
    date_of_birth,
    listen,
    phone,
    image,
    type
  );
  users.push(user);
};

export const getUsers = function () {
  return users;
};

export const getUserByID = function (id) {
  return users.find((user) => user.getId() === id) || null;
};

export const getUserByEmail = function (email) {
  return users.find((user) => user.getEmail() === email) || null;
};

export const deleteUser = function (id) {
  const index = users.findIndex((user) => user.getId() === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return null;
};

export const updateUser = function (
  id,
  email,
  name,
  password,
  address,
  gender,
  date_of_birth,
  listen,
  phone,
  image,
  type
) {
  const user = users.find((u) => u.getId() === id);
  if (user) {
    user.setName(name);
    user.setEmail(email);
    user.setPassword(password);
    user.setAddress(address);
    user.setGender(gender);
    user.setDateOfBirth(date_of_birth);
    user.setListen(listen);
    user.setPhone(phone);
    user.setImage(image);
    user.setType(type);
    return user;
  }
  return null;
};

// Sample usage
// pushUser(
//   1,
//   "Mohamad Eldabaa",
//   "maldb0907@gmail.com",
//   "123456",
//   "Tanta",
//   "male",
//   "2000-01-01",
//   "facebook",
//   "+201000000000",
//   "https://example.com/image1.jpg",
//   "user"
// );

console.log("start");
