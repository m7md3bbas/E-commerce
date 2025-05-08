import {
  pushProduct,
  getProducts,
  loadProductsFromStorage,
} from "./productModule.js";
import { getUsers } from "./usersModule.js";
import { getAllPurchases, pushPurchase } from "./purchases.js";
const API_ENDPOINTS = [
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

// Helper function to safely parse product data from API
const parseApiProduct = (apiProduct, sellerName, sellerEmail) => {
  return {
    id: apiProduct.id?.toString() || Math.random().toString(36).substring(2, 9),
    title: apiProduct.title || "Untitled Product",
    description: apiProduct.description || "No description available",
    price: typeof apiProduct.price === "number" ? apiProduct.price : 0,
    category: apiProduct.category || "uncategorized",
    stock: apiProduct.stock ?? apiProduct.quantity ?? 0,
    rating:
      typeof apiProduct.rating === "number"
        ? Math.min(Math.max(apiProduct.rating, 0), 5)
        : 0,
    thumbnail: apiProduct.thumbnail || "",
    images: Array.isArray(apiProduct.images) ? apiProduct.images : [],
    sellerName,
    sellerEmail,
    tags: Array.isArray(apiProduct.tags) ? apiProduct.tags : [],
  };
};

const fetchAndPushProducts = async (endpoint, sellerName, sellerEmail) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data.products)) {
      throw new Error("Invalid API response format - products array missing");
    }

    let successCount = 0;
    const errors = [];

    for (const apiProduct of data.products) {
      try {
        const parsedProduct = parseApiProduct(
          apiProduct,
          sellerName,
          sellerEmail
        );

        pushProduct(
          parsedProduct.id,
          parsedProduct.title,
          parsedProduct.description,
          parsedProduct.price,
          parsedProduct.category,
          parsedProduct.stock,
          parsedProduct.rating,
          [], // reviews
          parsedProduct.sellerName,
          parsedProduct.sellerEmail,
          new Date().toISOString(),
          parsedProduct.tags,
          parsedProduct.thumbnail
            ? [parsedProduct.thumbnail, ...parsedProduct.images]
            : ["default-image.jpg"]
        );

        successCount++;
      } catch (error) {
        errors.push({
          productId: apiProduct.id,
          error: error.message,
        });
        console.error(`Failed to add product ${apiProduct.id}:`, error);
      }
    }

    return {
      success: true,
      count: successCount,
      errors,
      endpoint,
    };
  } catch (error) {
    console.error("Fetch error for endpoint", endpoint, ":", error);
    return {
      success: false,
      error: error.message,
      endpoint,
    };
  }
};

const main = async () => {
  try {
    loadProductsFromStorage();
    const existingProducts = getProducts();

    if (existingProducts.length < 10) {
      const results = [];

      for (const [endpoint, sellerName, sellerEmail] of API_ENDPOINTS) {
        const result = await fetchAndPushProducts(
          endpoint,
          sellerName,
          sellerEmail
        );
        results.push(result);
        console.log(`Processed ${endpoint}:`, result);
      }

      console.log("Final results:", results);
      const totalAdded = results.reduce((sum, r) => sum + (r.count || 0), 0);
      console.log(`Total products added: ${totalAdded}`);
    } else {
      console.log("Already have products in storage:", existingProducts.length);
    }

    // console.log("Current products:", getProducts());
  } catch (error) {
    console.error("Fatal error in main:", error);
  }
};

// Start the process
main();

/////////////////////////////////////////////////////////////////////////////////////////////////

// for purchase.

if (getAllPurchases().length < 10) {
  pushPurchase(
    "131",
    "shipped",
    getUsers()[12],
    getProducts()[20],
    "2025-02-15"
  );
  pushPurchase(
    "132",
    "pending",
    getUsers()[4],
    getProducts()[35],
    "2024-11-22"
  );
  pushPurchase(
    "133",
    "completed",
    getUsers()[27],
    getProducts()[13],
    "2025-01-10"
  );
  pushPurchase(
    "134",
    "cancelled",
    getUsers()[19],
    getProducts()[2],
    "2024-10-14"
  );
  pushPurchase(
    "135",
    "shipped",
    getUsers()[9],
    getProducts()[46],
    "2025-03-08"
  );
  pushPurchase(
    "136",
    "completed",
    getUsers()[23],
    getProducts()[5],
    "2025-04-02"
  );
  pushPurchase(
    "137",
    "pending",
    getUsers()[2],
    getProducts()[38],
    "2024-12-18"
  );
  pushPurchase(
    "138",
    "cancelled",
    getUsers()[15],
    getProducts()[16],
    "2025-01-26"
  );
  pushPurchase(
    "139",
    "shipped",
    getUsers()[0],
    getProducts()[44],
    "2024-11-05"
  );
  pushPurchase(
    "140",
    "completed",
    getUsers()[26],
    getProducts()[8],
    "2025-03-14"
  );

  pushPurchase(
    "141",
    "pending",
    getUsers()[11],
    getProducts()[1],
    "2025-04-27"
  );
  pushPurchase(
    "142",
    "cancelled",
    getUsers()[5],
    getProducts()[30],
    "2025-01-03"
  );
  pushPurchase(
    "143",
    "completed",
    getUsers()[28],
    getProducts()[12],
    "2024-12-01"
  );
  pushPurchase(
    "144",
    "shipped",
    getUsers()[7],
    getProducts()[33],
    "2024-10-20"
  );
  pushPurchase(
    "145",
    "pending",
    getUsers()[14],
    getProducts()[18],
    "2025-02-08"
  );
  pushPurchase(
    "146",
    "cancelled",
    getUsers()[8],
    getProducts()[21],
    "2025-03-20"
  );
  pushPurchase(
    "147",
    "completed",
    getUsers()[21],
    getProducts()[9],
    "2025-04-14"
  );
  pushPurchase(
    "148",
    "shipped",
    getUsers()[3],
    getProducts()[27],
    "2024-11-29"
  );
  pushPurchase(
    "149",
    "pending",
    getUsers()[13],
    getProducts()[41],
    "2025-01-18"
  );
  pushPurchase(
    "150",
    "cancelled",
    getUsers()[17],
    getProducts()[25],
    "2025-02-26"
  );

  pushPurchase(
    "151",
    "completed",
    getUsers()[1],
    getProducts()[47],
    "2025-03-30"
  );
  pushPurchase(
    "152",
    "shipped",
    getUsers()[24],
    getProducts()[11],
    "2025-01-12"
  );
  pushPurchase(
    "153",
    "pending",
    getUsers()[6],
    getProducts()[19],
    "2024-12-22"
  );
  pushPurchase(
    "154",
    "cancelled",
    getUsers()[10],
    getProducts()[6],
    "2024-10-28"
  );
  pushPurchase(
    "155",
    "completed",
    getUsers()[18],
    getProducts()[29],
    "2025-02-03"
  );
  pushPurchase(
    "156",
    "shipped",
    getUsers()[20],
    getProducts()[0],
    "2024-11-16"
  );
  pushPurchase(
    "157",
    "pending",
    getUsers()[22],
    getProducts()[43],
    "2025-03-05"
  );
  pushPurchase(
    "158",
    "cancelled",
    getUsers()[16],
    getProducts()[10],
    "2025-04-22"
  );
  pushPurchase(
    "159",
    "completed",
    getUsers()[25],
    getProducts()[37],
    "2025-01-29"
  );
  pushPurchase(
    "160",
    "shipped",
    getUsers()[29],
    getProducts()[3],
    "2025-02-20"
  );
}
