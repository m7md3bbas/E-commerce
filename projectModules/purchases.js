// import {
//   pushUser,
//   getUsers,
//   getUserByID,
//   deleteUser,
//   updateUser,
//   getUserByEmail,
// } from "../projectModules/usersModule.js";

// import {
//   pushProduct,
//   getProducts,
//   getProductById,
//   getProductsBySellerName,
//   getProductsBySellerEmail,
//   deleteProduct,
//   updateProduct,
// } from "../projectModules/usersModule.js";

class Purchase {
  #id;
  #status;
  #buyer;
  #product;

  constructor(id, status, buyer, product) {
    if (!(buyer instanceof Object) || typeof buyer.getId !== "function") {
      throw new Error("Buyer must be an instance of User.");
    }

    if (!(product instanceof Object) || typeof product.getId !== "function") {
      throw new Error("Product must be an instance of Product.");
    }

    this.setId(id);
    this.setStatus(status);
    this.setBuyer(buyer);
    this.setProduct(product);
  }

  getId() {
    return this.#id;
  }
  setId(id) {
    if (!id) {
      throw new Error("ID is required.");
    }
    this.#id = id;
  }

  getStatus() {
    return this.#status;
  }
  setStatus(status) {
    const validStatuses = ["pending", "shipped", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status value.");
    }
    this.#status = status;
  }

  getBuyer() {
    return this.#buyer;
  }
  setBuyer(buyer) {
    this.#buyer = buyer;
  }

  getProduct() {
    return this.#product;
  }
  setProduct(product) {
    this.#product = product;
  }
}

let purchases_arr = [];
export const pushPurchase = function (id, status, buyer, product) {
  const purchase = new Purchase(id, status, buyer, product);
  purchases_arr.push(purchase);
  return purchase;
};

export const getPurchaseById = function (id) {
  const purchase = purchases_arr.find((purchase) => purchase.getId() === id);
  return purchase || null;
};

export const getPurchaseBySellerId = function (sellerName) {
  return purchase_arr.filter(
    (purchase) => purchase.getProduct().getSeller() === sellerName
  );
};

export const getPurchaseBySellerGmail = function (sellerEmail) {
  return purchase_arr.filter(
    (purchase) => purchase.getProduct().getSellerEmail() === sellerEmail
  );
};

export const getAllPurchases = function () {
  return purchases_arr;
};

export const getPurchasesByBuyerId = function (userId) {
  return purchases_arr.filter(
    (purchase) => purchase.getBuyer().getId() === userId
  );
};

export const getPurchasesByBuyerEmail = function (userEmail) {
  return purchases_arr.filter(
    (purchase) => purchase.getBuyer().getEmail() === userEmail
  );
};
