console.log("product.js");

import {
  pushUser,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
  getUserByEmail,
} from "../../../projectModules/usersModule.js";

import {
  pushProduct,
  getProducts,
  getProductById,
  getProductsBySellerName,
  getProductsBySellerEmail,
  deleteProduct,
  updateProduct,
} from "../../../projectModules/productsModule.js";

import {
  pushPurchase,
  getPurchaseById,
  getPurchaseBySellerId,
  getPurchaseBySellerGmail,
  getAllPurchases,
  getPurchasesByBuyerId,
  getPurchasesByBuyerEmail,
} from "../../../projectModules/purchases.js";

pushUser(
  1,
  "mohammad",
  "mohammadeldab20@gmail.com",
  "1234567",
  "tanta",
  "male",
  "2000-10-01",
  "facebook",
  "01012345678",
  "mohammad.png",
  "user"
);

pushUser(
  1,
  "mohammad",
  "maldb0907@gmail.com",
  "123465798",
  "tanta",
  "male",
  "2023-10-01",
  "facebook",
  "010123456789",
  "mohammad.png",
  "user"
);

pushProduct(
  1,
  "mouse",
  "this is a mouse",
  100,
  "accessories",
  100,
  4.5,
  [],
  "mohammad",
  "maldb0907@gmail.com",
  "2023-10-01",
  ["tag1", "tag2"],
  ["image1.png", "image2.png"]
);

pushUser(
  1,
  "mohammad",
  "maldb0907@gmail.com",
  "123465798",
  "tanta",
  "male",
  "2023-10-01",
  "facebook",
  "010123456789",
  "mohammad.png",
  "user"
);

pushProduct(
  1,
  "mouse",
  "this is a mouse",
  100,
  "accessories",
  100,
  4.5,
  [],
  "mohammad",
  "maldb0907@gmail.com",
  "2023-10-01",
  ["tag1", "tag2"],
  ["image1.png", "image2.png"]
);

// console.log(getProducts()[0].getRating()); // should be Product
// console.log(getUsers()[1].getDateOfBirth());

// console.log(getUserByEmail("maldb0907@gmail.com"));
if (getUserByEmail("maldbjhghj0907@gmail.com")) {
  console.log("exists");
} else {
  console.log("not exists");
}

pushPurchase(1, "pending", getUsers()[1], getProducts()[0]);
console.log(getAllPurchases());

// console.log(getAllPurchases());
// const jsonString = JSON.stringify(getAllPurchases());
// console.log(JSON.parse(jsonString)[0]);















