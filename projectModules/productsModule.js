const DB_NAME = "ProductDatabase";
const DB_VERSION = 1;
const STORE_NAME = "products";

// --- Product Class ---
class Product {
  #id;
  #productName;
  #description;
  #price;
  #category;
  #stock;
  #rating;
  #reviews;
  #seller;
  #sellerEmail;
  #createdTime;
  #tags;
  #images;

  constructor(
    id,
    productName,
    description,
    price,
    category,
    stock,
    rating,
    reviews,
    seller,
    sellerEmail,
    createdTime,
    tags,
    images
  ) {
    this.#id = id;
    this.setProductName(productName);
    this.setDescription(description);
    this.setPrice(price);
    this.setCategory(category);
    this.setStock(stock);
    this.setRating(rating);
    this.setReviews(reviews);
    this.setSeller(seller);
    this.setSellerEmail(sellerEmail);
    this.setCreatedTime(createdTime);
    this.setTags(tags);
    this.setImages(images);
  }

  getId() {
    return this.#id;
  }

  getProductName() {
    return this.#productName;
  }
  setProductName(name) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Product name must be a non-empty string.");
    }
    this.#productName = name;
  }

  getDescription() {
    return this.#description;
  }
  setDescription(desc) {
    if (typeof desc !== "string" || desc.trim() === "") {
      throw new Error("Description must be a non-empty string.");
    }
    this.#description = desc;
  }

  getPrice() {
    return this.#price;
  }
  setPrice(price) {
    if (typeof price !== "number" || price < 0) {
      throw new Error("Price must be a non-negative number.");
    }
    this.#price = price;
  }

  getCategory() {
    return this.#category;
  }
  setCategory(category) {
    if (typeof category !== "string" || category.trim() === "") {
      throw new Error("Category must be a non-empty string.");
    }
    this.#category = category;
  }

  getStock() {
    return this.#stock;
  }
  setStock(stock) {
    if (!Number.isInteger(stock) || stock < 0) {
      throw new Error("Stock must be a non-negative integer.");
    }
    this.#stock = stock;
  }

  getRating() {
    return this.#rating;
  }
  setRating(rating) {
    if (typeof rating !== "number" || rating < 0 || rating > 5) {
      throw new Error("Rating must be a number between 0 and 5.");
    }
    this.#rating = rating;
  }

  getReviews() {
    return this.#reviews;
  }
  setReviews(reviews) {
    if (!Array.isArray(reviews)) {
      throw new Error("Reviews must be an array.");
    }
    this.#reviews = reviews;
  }

  getSeller() {
    return this.#seller;
  }
  setSeller(seller) {
    if (typeof seller !== "string" || seller.trim() === "") {
      throw new Error("Seller must be a non-empty string.");
    }
    this.#seller = seller;
  }

  getSellerEmail() {
    return this.#sellerEmail;
  }
  setSellerEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }
    this.#sellerEmail = email;
  }

  getCreatedTime() {
    return this.#createdTime;
  }
  setCreatedTime(time) {
    const date = new Date(time);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid created time format.");
    }
    this.#createdTime = date.toISOString();
  }

  getTags() {
    return this.#tags;
  }
  setTags(tags) {
    if (!Array.isArray(tags)) {
      throw new Error("Tags must be an array of strings.");
    }
    this.#tags = tags;
  }

  getImages() {
    return this.#images;
  }
  setImages(images) {
    if (!Array.isArray(images)) {
      throw new Error("Images must be an array of string URLs.");
    }
    this.#images = images;
  }
}

// --- Product Management ---
let products = [];
let db;

export const initDB = function () {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("seller", "seller", { unique: false });
        store.createIndex("sellerEmail", "sellerEmail", { unique: false });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject("Error opening database");
    };
  });
};

export const pushProduct = async function (
  id,
  productName,
  description,
  price,
  category,
  stock,
  rating,
  reviews,
  seller,
  sellerEmail,
  createdTime,
  tags,
  images
) {
  const product = new Product(
    id,
    productName,
    description,
    price,
    category,
    stock,
    rating,
    reviews,
    seller,
    sellerEmail,
    createdTime,
    tags,
    images
  );

  products.push(product);

  await initDB();

  if (db) {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.add({
      id: product.getId(),
      productName: product.getProductName(),
      description: product.getDescription(),
      price: product.getPrice(),
      category: product.getCategory(),
      stock: product.getStock(),
      rating: product.getRating(),
      reviews: product.getReviews(),
      seller: product.getSeller(),
      sellerEmail: product.getSellerEmail(),
      createdTime: product.getCreatedTime(),
      tags: product.getTags(),
      images: product.getImages(),
    });
  }
};

export async function getProducts() {
  await initDB();
  await loadProductsFromDB();
  return products;
}

export async function getProductById(id) {
  
  
return products.find((p) => p.getId() === id) || null;

}

export const deleteProduct = async (id) => {
  const index = products.findIndex((p) => p.getId() === id);
  if (index !== -1) {
    const deleted = products.splice(index, 1)[0];
    await saveProductsToDB(); 
    return deleted;
  }
  return null;
};

export const getProductsBySellerName = (name) =>
  products.filter((p) => p.getSeller() === name);

export const getProductsBySellerEmail = (email) =>
  products.filter((p) => p.getSellerEmail() === email);

export const updateProduct = async function (
  id,
  productName,
  description,
  price,
  category,
  stock,
  rating,
  reviews,
  seller,
  sellerEmail,
  createdTime,
  tags,
  images
) {
  const product = products.find((p) => p.getId() === id);

  if (product) {
    product.setProductName(productName);
    product.setDescription(description);
    product.setPrice(price);
    product.setCategory(category);
    product.setStock(stock);
    product.setRating(rating);
    product.setReviews(reviews);
    product.setSeller(seller);
    product.setSellerEmail(sellerEmail);
    product.setCreatedTime(createdTime);
    product.setTags(tags);
    product.setImages(images);

    await saveProductsToDB();
    return product;
  }
  return null;
};

export const saveProductsToDB = function () {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database not initialized");
      return;
    }

    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
      const addRequests = products.map((product) => {
        return new Promise((resolveAdd, rejectAdd) => {
          const request = store.add({
            id: product.getId(),
            productName: product.getProductName(),
            description: product.getDescription(),
            price: product.getPrice(),
            category: product.getCategory(),
            stock: product.getStock(),
            rating: product.getRating(),
            reviews: product.getReviews(),
            seller: product.getSeller(),
            sellerEmail: product.getSellerEmail(),
            createdTime: product.getCreatedTime(),
            tags: product.getTags(),
            images: product.getImages(),
          });
          request.onsuccess = () => resolveAdd();
          request.onerror = () => rejectAdd();
        });
      });

      Promise.all(addRequests)
        .then(() => resolve("All products saved to IndexedDB"))
        .catch((error) => reject(`Error saving products: ${error}`));
    };

    clearRequest.onerror = () => {
      reject("Error clearing existing data");
    };
  });
};

export const loadProductsFromDB = function () {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database not initialized");
      return;
    }

    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = (event) => {
      const productData = event.target.result;
      products = productData.map(
        (data) =>
          new Product(
            data.id,
            data.productName,
            data.description,
            data.price,
            data.category,
            data.stock,
            data.rating,
            data.reviews,
            data.seller,
            data.sellerEmail,
            data.createdTime,
            data.tags,
            data.images
          )
      );
      resolve("Products loaded from IndexedDB");
    };

    request.onerror = (event) => reject(event.target.error);
  });
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




