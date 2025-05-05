class User {
  #id;
  #name;
  #email;
  #password;
  #backupCode;
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
    backupCode = null,
    address = null,
    gender = null,
    date_of_birth = null,
    listen = null,
    phone = null,
    image = null,
    type = "user"
  ) {
    this.#id = id;
    this.setName(name);
    this.setEmail(email);
    this.setPassword(password);
    this.#backupCode = backupCode || this.generateBackupCode();
    if (address) this.setAddress(address);
    if (gender) this.setGender(gender);
    if (date_of_birth) this.setDateOfBirth(date_of_birth);
    if (listen) this.setListen(listen);
    if (phone) this.setPhone(phone);
    if (image) this.setImage(image);
    this.setType(type);
  }

  generateBackupCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Getters and Setters
  getId() { return this.#id; }
  getName() { return this.#name; }
  setName(name) {
    if (typeof name !== "string" || name.trim() === "") throw new Error("Name must be a non-empty string.");
    this.#name = name;
  }

  getEmail() { return this.#email; }
  setEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(email)
    if (!emailRegex.test(email)) throw new Error("Invalid email format.");
    this.#email = email;
  }

  getPassword() { return this.#password; }
  setPassword(password) {
    if (typeof password !== "string" || password.length < 6) throw new Error("Password must be at least 6 characters long.");
    this.#password = password;
  }

  getBackupCode() { return this.#backupCode; }

  getAddress() { return this.#address; }
  setAddress(address) {
    if (typeof address !== "string" || address.trim() === "") throw new Error("Address must be a non-empty string.");
    this.#address = address;
  }

  getType() { return this.#type; }
  setType(type) {
    if (type !== "seller" && type !== "user") throw new Error("Type must be either 'seller' or 'user'.");
    this.#type = type;
  }

  getGender() { return this.#gender; }
  setGender(gender) {
    const validGenders = ["male", "female"];
    if (!validGenders.includes(gender.toLowerCase())) throw new Error('Gender must be "male", "female".');
    this.#gender = gender.toLowerCase();
  }

  getDateOfBirth() { return this.#date_of_birth; }
  setDateOfBirth(date) {
    const dob = new Date(date);
    if (isNaN(dob.getTime())) throw new Error("Invalid date of birth.");
    this.#date_of_birth = dob.toISOString().split("T")[0];
  }

  getListen() { return this.#listen; }
  setListen(listen) {
    if (listen !== null && listen !== undefined) this.#listen = listen;
  }

  getPhone() { return this.#phone; }
  setPhone(phone) {
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phone)) throw new Error("Invalid phone number format.");
    this.#phone = phone;
  }

  getImage() { return this.#image; }
  setImage(image) {
    if (typeof image !== "string" || image.trim() === "") throw new Error("Image must be a non-empty string URL.");
    this.#image = image;
  }

  // New method for password updates only
  updatePassword(newPassword) {
    this.setPassword(newPassword);
  }

  // Serialization
  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      password: this.#password,
      backupCode: this.#backupCode,
      address: this.#address,
      type: this.#type,
      gender: this.#gender,
      date_of_birth: this.#date_of_birth,
      listen: this.#listen,
      phone: this.#phone,
      image: this.#image,
    };
  }

  static fromJSON(data) {
    return new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.backupCode,
      data.address,
      data.gender,
      data.date_of_birth,
      data.listen,
      data.phone,
      data.image,
      data.type
    );
  }
}

// Users management functions
let users = [];

export const pushUser = function (
  id,
  name,
  email,
  password,
  backupCode,
  address,
  gender,
  date_of_birth,
  listen,
  phone,
  image,
  type
) {
  const user = new User(
    id,
    name,
    email,
    password,
    backupCode,
    address,
    gender,
    date_of_birth,
    listen,
    phone,
    image,
    type
  );
  users.push(user);
  saveToLocalStorage();
};

export const getUsers = () => {
  loadFromLocalStorage();
  return users;
};

export const getUserByID = (id) => {
  loadFromLocalStorage();
  return users.find((user) => user.getId() === id) || null;
};

export const getUserByEmail = (email) => {
  loadFromLocalStorage();
  return users.find((user) => user.getEmail() === email) || null;
};

export const deleteUser = (id) => {
  const index = users.findIndex((user) => user.getId() === id);
  if (index !== -1) {
    const [removed] = users.splice(index, 1);
    saveToLocalStorage();
    return removed;
  }
  return null;
};


export const deleteLastUser = () => {
  
    const [removed] = users.splice(users.length-1, 1);
    saveToLocalStorage();
    return removed;
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
    if (password) user.setPassword(password);
    if (address) user.setAddress(address);
    if (gender) user.setGender(gender);
    if (date_of_birth) user.setDateOfBirth(date_of_birth);
    if (listen) user.setListen(listen);
    if (phone) user.setPhone(phone);
    if (image) user.setImage(image);
    user.setType(type);
    saveToLocalStorage();
    return user;
  }
  return null;
};


///////////////////////////////////////////////////////////////////////////////////////////////////////


export const updateUserPassword = function(id, newPassword) {
  const user = users.find((u) => u.getId() === id);
  if (user) {
    user.updatePassword(newPassword);
    saveToLocalStorage();
    return user;
  }
  return null;
};

const saveToLocalStorage = () => {
  const serialized = users.map((u) => u.toJSON());
  localStorage.setItem("users", JSON.stringify(serialized));
};

const loadFromLocalStorage = () => {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers).map((u) => User.fromJSON(u));
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////