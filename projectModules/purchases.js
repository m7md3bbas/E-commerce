const STORAGE_KEY = "purchases_storage";
import { getUserByID, deletedUser } from "./usersModule.js";
import { getProductById, deletedProduct } from "./productModule.js";

class Purchase {
  #id;
  #status;
  #buyer;
  #product;
  #date_of_purchase;

  constructor(id, status, buyer, product, date_of_purchase) {
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
    this.setDateOfPurchase(date_of_purchase);
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
  setDateOfPurchase(date) {
    if (date) this.#date_of_purchase = date;
    else this.#date_of_purchase = new Date().toLocaleString();
  }
  getDateOfPurchase() {
    return this.#date_of_purchase;
  }
}

let purchases_arr = [];
export const pushPurchase = function (
  id,
  status,
  buyer,
  product,
  dateOfPurchase
) {
  const purchase = new Purchase(id, status, buyer, product, dateOfPurchase);
  purchases_arr.push(purchase);
  savePurchasesToStorage();
  return purchase;
};

export const getPurchaseById = function (id) {
  loadPurchasesFromStorage();
  const purchase = purchases_arr.find((purchase) => purchase.getId() === id);
  return purchase || null;
};

export const getPurchaseBySellerId = function (sellerName) {
  return purchases_arr.filter(
    (purchase) => purchase.getProduct().getSeller() === sellerName
  );
};

export const getPurchaseBySellerGmail = function (sellerEmail) {
  return purchases_arr.filter(
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

export const deletePurchase = (id) => {
  const index = purchases_arr.findIndex(
    (purchase) => purchase.getId().toString() === id.toString()
  );
  if (index !== -1) {
    const [removed] = purchases_arr.splice(index, 1);
    savePurchasesToStorage();
    return removed;
  }
  return null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////

/////  Save
export const savePurchasesToStorage = () => {
  const simplifiedPurchases = purchases_arr.map((purchase) => ({
    id: purchase.getId(),
    status: purchase.getStatus(),
    buyerId: purchase.getBuyer().getId(),
    productId: purchase.getProduct().getId(),
    dateOfPurchase: purchase.getDateOfPurchase(),
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(simplifiedPurchases));
};

////// Load
export const loadPurchasesFromStorage = () => {
  const purchase = localStorage.getItem(STORAGE_KEY);
  if (!purchase) return;

  try {
    const parsed = JSON.parse(purchase);
    purchases_arr = parsed.map(
      ({ id, status, buyerId, productId, dateOfPurchase }) => {
        let buyer = getUserByID(buyerId);
        if (!buyer) buyer = deletedUser();
        let product = getProductById(productId);
        if (!product) product = deletedProduct();

        // if (!buyer || !product)
        //   throw new Error("Invalid reference in storage.");

        return new Purchase(id, status, buyer, product, dateOfPurchase);
      }
    );
  } catch (err) {
    console.error("Failed to load purchases from storage:", err);
    purchases_arr = [];
  }
};

loadPurchasesFromStorage();
