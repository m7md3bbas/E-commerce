import {
  pushProduct,
  getProducts,
  loadProductsFromStorage,
} from "./productModule.js";

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
      console.log(
        "Already have sufficient products in storage:",
        existingProducts.length
      );
    }

    console.log("Current products:", getProducts());
  } catch (error) {
    console.error("Fatal error in main:", error);
  }
};

// Start the process
main();