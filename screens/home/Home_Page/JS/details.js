import { getProductById } from "../../../../projectModules/productModule.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productId");
  document.querySelector(".addToCart").setAttribute("data-id", productId);

  if (productId) {
    // استعراض المنتج بناءً على الـ productId
    //read products from local storage
    var savedProducts = localStorage.getItem("products");
    //parse products from local storage
    savedProducts = JSON.parse(savedProducts);
    console.log(savedProducts);
    console.log(typeof productId);
    console.log(savedProducts[0]["id"]);
    console.log(savedProducts.length);
    // search for the product in the array of products saved in local storage by productId
    var selectedProduct = savedProducts.find(
      (product) => product.id == productId
    );
    console.log("selectedProduct is ");
    console.log(selectedProduct);
    console.log(selectedProduct.productName);
    if (productId) {
        // استعراض المنتج بناءً على الـ productId
        //read products from local storage
        var savedProducts = localStorage.getItem("products");
        //parse products from local storage 
        savedProducts = JSON.parse(savedProducts);
        var selectedProduct = savedProducts.find(product => product.id == productId);

    if (selectedProduct) {
      // select product-name from details page
      document.querySelector(".product-name").textContent =
        selectedProduct.productName;
      // select product-image from details page
      document.querySelector(".product-image").src = selectedProduct.images[0];
      // select product-description from details page
      document.querySelector(".product-description").textContent =
        selectedProduct.description;
      // select price from details page
      document.querySelector(
        ".product-price"
      ).textContent = `$${selectedProduct.price}`;
      // select rating from details page
      document.querySelector(".rating").innerHTML = generateRatingStars(
        selectedProduct.rating
      );

      const productImages = selectedProduct.images;
      const thumbnailsContainer = document.querySelector(".image-thumbnails");
      thumbnailsContainer.innerHTML = "";
      // التحكم في عرض المقاسات بناءً على التصنيف
      const sizeSection = document.getElementById("sizes-container");
      const sizesNumberSection = document.getElementById(
        "sizes-numbers-container"
      );

      const clothingCategories = ["tops", "mens-shirts", "womens-dresses"];
      const shoesCategories = ["womens-shoes", "mens-shoes"];

      // إخفاء الاتنين في البداية
      sizeSection.style.display = "none";
      sizesNumberSection.style.display = "none";

      // لو ملابس ➜ عرض المقاسات
      if (clothingCategories.includes(selectedProduct.category)) {
        sizeSection.style.display = "block";
      }
      // لو أحذية ➜ عرض مقاسات بالأرقام
      else if (shoesCategories.includes(selectedProduct.category)) {
        sizesNumberSection.style.display = "block";
      }

      /***********Same image For same Product***************************/
      productImages.forEach((imgSrc, index) => {
        const thumb = document.createElement("img");
        thumb.src = imgSrc;
        thumb.alt = `Thumbnail ${index + 1}`;
        thumb.classList.add("thumbnail-image");
        thumb.style.width = "80px";
        thumb.style.height = "80px";
        thumb.style.cursor = "pointer";
        thumb.style.objectFit = "cover";

        thumb.addEventListener("click", () => {
          document.querySelector(".product-image").src = imgSrc;
        });

        thumbnailsContainer.appendChild(thumb);
      });
      displayRelatedProducts(selectedProduct.category, selectedProduct.id);
    } else {
      console.log(urlParams);
      console.log(productId);
      console.error("Product not found!");
    }

    // displayRelatedProducts(selectedProduct?.getCategory());
  } else {
    console.error("Product ID not found!");
  }
});

function generateRatingStars(rating) {
  let stars = "";
  for (let i = 0; i < Math.floor(rating); i++) {
    stars += "★";
  }
  if (rating % 1 !== 0) {
    stars += "☆"; // لإضافة نجمة غير مكتملة إذا كان التقييم عشري
  }
  return stars;
}

function displayRelatedProducts(category, currentProductId) {
  const allProducts = JSON.parse(localStorage.getItem("products")) || [];

  const related = allProducts.filter(
    (product) => product.category === category && product.id != currentProductId
  );

  const relatedContainer = document.querySelector(".related-products .cards");
  relatedContainer.innerHTML = ""; // لتفريغ المنتجات السابقة

  if (related.length === 0) {
    relatedContainer.innerHTML = "<p>No related products found.</p>";
    return;
  }

  related.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "col-xl-3 col-lg-4 col-sm-6 col-6";

    productCard.innerHTML = `
    <div class="card">
        <a href="./datails.html?productId=${ product.id}" class="text-decoration-none text-dark">
            <img src="${product.images[0]}" alt="${product.productName}" class="related-image" />
            <div class="info p-2">
                <h4 class="related-name text-truncate " id='productItem'>${ product.productName}</h4>
                <div class="d-flex justify-content-between align-items-center px-2">
                    <p class="related-price mb-0" id='price'>$${ product.price}</p>
                    <span class="text-warning">${generateRatingStars( product.rating  )}</span>
                </div>
            </div>
            </a>

          <button  class="w-100 addToCart"   data-id="${
              product.id
            }">Add To Cart</button>
        </div>
            
      `;

    relatedContainer.appendChild(productCard);
  });
}

/* <a href="details.html?productId=${product.id}" class="view-details">View Details</a> */

/*Size Button*/
document.addEventListener("DOMContentLoaded", () => {
  const allSizeSections = document.querySelectorAll(".size");

  allSizeSections.forEach((section) => {
    const buttons = section.querySelectorAll("button");
    const numSpan = section.querySelector(".num");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        numSpan.textContent = button.textContent;
      });
    });
  });
});

//////////////      AddToCart  ////////////////

function showToast(message, type = "success", duration = 1000) {
  const toast = document.createElement("div");
  toast.className = `alert alert-${type} toast-message shadow`;
  toast.textContent = message;
  toast.style.cssText = `
    min-width: 200px;
    margin-bottom: 10px;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  `;

  const container = document.getElementById("toastContainer");
  container.appendChild(toast);

  // Fade in
  setTimeout(() => {
    toast.style.opacity = "1";
  }, 100);

  // Fade out & remove
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
    }, 100);
  }, duration);
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("addToCart")) {
    console.log("hii");

    const button = e.target;
    const card = button.closest(".details");
    const img = card.querySelector(" .product-image");
    const productId = button.dataset.id;
    const productItem = card.querySelector(".product-name").textContent;
    const price = card.querySelector(".product-price").textContent;

    const product = {
      id: productId,
      img: img.src,
      name: productItem,
      price,
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
    console.log(productId);

    var realProduct = getProductById(productId);
    console.log(realProduct);

    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
      if (existingProduct.quantity < realProduct.getStock()) {
        existingProduct.quantity += 1;
        showToast("Product added to cart");
        console.log("Product added to cart");
      } else {
        alert("Stock limit reached.");
        return;
      }
    } else {
      if (realProduct.getStock() > 0) {
        const newProduct = {
          id: productId,
          img: img.src,
          name: productItem,
          price,
          quantity: 1,
        };
        cart.push(newProduct);
        showToast("Product added to cart");

        console.log("Product added to cart");
      } else {
        alert("Stock is empty.");
        return;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(JSON.parse(localStorage.getItem("cart")));
  }
});
