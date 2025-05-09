class Contact {
  constructor(id, name, phone, message, date = new Date().toString()) {
    this._id = id;
    this._phone = phone;
    this._message = message;
    this._name = name;
    this.date = date;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get phone() {
    return this._phone;
  }

  set phone(value) {
    this._phone = value;
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get date() {
    return this._date;
  }

  set date(value) {
    this._date = value;
  }
}

let messages = [];

export function getAllMessages() {
  return messages;
}

export function pushMessage(
  id,
  name,
  phone,
  message,
  date = new Date().toISOString()
) {
  let mess = new Contact(id, name, phone, message, date);
  messages.push(mess);
  saveMessagesToStorage();
}

export function saveMessagesToStorage() {
  const allMessages = messages.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    message: item.message,
    date: item.date,
  }));

  localStorage.setItem("messages", JSON.stringify(allMessages));
}

export function loadMessagesFromStorage() {
  const stored = localStorage.getItem("messages");
  if (stored) {
    const parsed = JSON.parse(stored);
    messages = parsed.map(
      (item) =>
        new Contact(item.id, item.name, item.phone, item.message, item.date)
    );
  }
}
loadMessagesFromStorage();

export const deleteMessage = (id) => {
  const index = messages.findIndex((mess) => mess.id == id);
  if (index !== -1) {
    const [removed] = messages.splice(index, 1);
    saveMessagesToStorage();
    return removed;
  }
  return null;
};

// pushMessage(
//   1,
//   "Mohammad Eldabaa",
//   "01012345678",
//   "How are youfajslkdjflakjdfl adsfjlkjfa fad ;ldkafjlkad fafd jfda;lfa d;d?",
//   "2024-05-09T12:00:00Z"
// );
// console.log("adding........");
// pushMessage(
//   2,
//   "Mohammad Ali",
//   "01087654321",
//   "Let's go! ajflajl; fd lajf ;dalk alfdj a;lkfdf af",
//   new Date().toISOString()
// );
