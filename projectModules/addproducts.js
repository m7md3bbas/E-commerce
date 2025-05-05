import {
  pushProduct,
  getProducts,
  initDB,
  saveProductsToDB,
  loadProductsFromDB,
} from "./productsModule.js";

let i = 0;
let arr_api = [
  [
    "https://dummyjson.com/products/category/tops",
    "Diaa Taha",
    "user45@gmail.com",
  ],
  [
    "https://dummyjson.com/products/category/mens-shirts",
    "Baraa Youssef",
    "user47@gmail.com",
  ],
  [
    "https://dummyjson.com/products/category/mens-shirts",
    "Hammam Khaled",
    "user48@gmail.com",
  ],
  [
    "https://dummyjson.com/products/category/womens-dresses",
    "Magdy Sami",
    "user49@gmail.com",
  ],
  [
    "https://dummyjson.com/products/category/womens-jewellery",
    "Diaa Taha",
    "user45@gmail.com",
  ],
  [
    "https://dummyjson.com/products/category/sports-accessories",
    "Baraa Youssef",
    "user47@gmail.com",
  ],
  [
    "https://dummyjson.com/products/category/womens-bags",
    "Hammam Khaled",
    "user48@gmail.com",
  ],
  [
    "https://dummyjson.com/products/category/womens-shoes",
    "Magdy Sami",
    "user49@gmail.com",
  ],
  [
    "https://dummyjson.com/products/category/womens-watches",
    "Diaa Taha",
    "user45@gmail.com",
  ],
  [
    "https://dummyjson.com/products/category/fragrances",
    "Baraa Youssef",
    "user47@gmail.com",
  ],
  [
    "https://dummyjson.com/products/category/mens-shoes",
    "Hammam Khaled",
    "user48@gmail.com",
  ],
  [
    "https://dummyjson.com/products/category/mens-watches",
    "Magdy Sami",
    "user49@gmail.com",
  ],
];
const fetchAndPushMensShirts = async function (item) {
  try {
    const response = await fetch(item[0]);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const shirts = data.products;

    shirts.forEach((shirt) => {
      pushProduct(
        shirt.id.toString(),
        shirt.title,
        shirt.description,
        shirt.price,
        shirt.category,
        shirt.stock,
        shirt.rating,
        [],
        item[1],
        item[2],
        new Date().toISOString(),
        shirt.tags || [],
        [shirt.thumbnail, ...shirt.images]
      );
    });

    return { success: true, count: shirts.length };
  } catch (error) {
    console.error("Error fetching shirts:", error);
    return { success: false, error: error.message };
  }
};

const main = async () => {
  try {
    await initDB();
    await loadProductsFromDB();

    if (getProducts().length < 10) {
      for (const item of arr_api) {
        await fetchAndPushMensShirts(item);
      }
      await saveProductsToDB();
    }

    console.log("Done loading and saving products");
    await console.log(getProducts());
    // await go();
    // await ddd();
  } catch (err) {
    console.error("Initialization error:", err);
  }
};

main();

// function ddd() {
//   let pro = getProducts();
//   pro.forEach(function (item) {
//     console.log(item.getCategory());
//   });
// }

// async function go() {
//   pushProduct(
//     123,
//     "product1",
//     "how are you",
//     150,
//     "category",
//     85,
//     4.4,
//     [],
//     "mohammad ramadan",
//     "moldb0907@gmail.com",
//     "2025-05-01",
//     [],
//     []
//   );

//   await console.log(getProducts());

//   await console.log("pushed");
// }
