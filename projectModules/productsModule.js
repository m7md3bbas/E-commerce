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
    // if (new.target.name === "Product") {
    //   throw new Error(
    //     "Abstract Class, you can't create an instance of Product directly!"
    //   );
    // }

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

export const pushProduct = function (
  id,
  productName,
  description,
  price,
  category,
  stock,
  rating,
  reviews,
  seller,
  sellerEmail, // FIXED
  createdTime,
  tags,
  images
) {
  // class ConcreteProduct extends Product {
  //   constructor(
  //     id,
  //     productName,
  //     description,
  //     price,
  //     category,
  //     stock,
  //     rating,
  //     reviews,
  //     seller,
  //     sellerEmail, // FIXED
  //     createdTime,
  //     tags,
  //     images
  //   ) {
  //     super(
  //       id,
  //       productName,
  //       description,
  //       price,
  //       category,
  //       stock,
  //       rating,
  //       reviews,
  //       seller,
  //       sellerEmail, // FIXED
  //       createdTime,
  //       tags,
  //       images
  //     );
  //   }
  // }
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
    sellerEmail, // FIXED
    createdTime,
    tags,
    images
  );
  products.push(product);
};

export const getProducts = function () {
  return products;
};

export const getProductById = function (id) {
  return products.find((product) => product.getId() === id) || null;
};

export const deleteProduct = function (id) {
  const index = products.findIndex((product) => product.getId() === id);
  if (index !== -1) {
    return products.splice(index, 1)[0];
  }
  return null;
};

export const getProductsBySellerName = function (name) {
  return products.filter((product) => product.getSeller() === name);
};

export const getProductsBySellerEmail = function (email) {
  return products.filter((product) => product.getSellerEmail() === email); // FIXED
};

export const updateProduct = function (
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
    product.setSellerEmail(sellerEmail); // FIXED
    product.setCreatedTime(createdTime);
    product.setTags(tags);
    product.setImages(images);
    return product;
  }
  return null;
};

// Example usage (uncomment to test):
// pushProduct(
//   1,
//   "Wireless Mouse",
//   "A smooth and responsive wireless mouse",
//   29.99,
//   "Electronics",
//   100,
//   4.5,
//   ["Great quality!", "Works well with my laptop."],
//   "TechStore",
//   "techstore@example.com",
//   "2024-12-01T10:00:00Z",
//   ["electronics", "mouse", "wireless"],
//   ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
// );

// console.log(getProducts());
