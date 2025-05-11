import {
  getProductById,
  getProducts,
  decreaseProductStock,
} from "../../../../projectModules/productModule.js";
import {
  getAllMessages,
  pushMessage,
} from "../../../../projectModules/contactus.js";

// MARK: Categories
$(document).ready(function () {
  $("#owl-demo").owlCarousel({
    autoPlay: 500, //Set AutoPlay to 3 seconds

    items: 4,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [979, 3],
  });
});

// MARK: Switch between login logout
const current_user = JSON.parse(localStorage.getItem("current_user"));
if (current_user) {
  $("#login").css("display", "none");
  $("#name").css("display", "none");
  $("#phone").css("display", "none");
  if (current_user.type === "admin") {
    $("#dashboard").css("display", "block");
    $("#logout").css("display", "block");
    $("#dashboard").on("click", () => {
      window.location.href = "./../../admin/admin.html";
    });
  } else if (current_user.type === "seller") {
    $("#dashboard").css("display", "block");
    $("#logout").css("display", "block");
    $("#dashboard").on("click", () => {
      window.location.href = "./../../seller/html/seller-dashboard.html";
    });
  } else if (current_user.type === "user") {
    $("#logout").css("display", "block");
    $("#dashboard").css("display", "none");
  }
} else {
  $("#logout").css("display", "none");
  $("#dashboard").css("display", "none");

  $("#cart").on("click", () => {
    window.location.href = "./../../auth/login.html";
  });
}
// MARK:Logout
$("#logout").on("click", logout);
function logout() {
  localStorage.removeItem("current_user");
  window.location.replace("./../../auth/login.html");
}

// MARK: Show cart
document.querySelector(".cartHome").addEventListener("click", function () {
  window.location.href = "../Cart/cart.html";
});

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

document;

// document.addEventListener("DOMContentLoaded", function () {
//   const sections = document.querySelectorAll("section");
//   const navLinks = document.querySelectorAll(".nav-link");

//   const observerOptions = {
//     root: null, // يراقب ضمن نافذة العرض
//     threshold: 0.5, // يظهر عندما يكون 50% من العنصر مرئيًا
//   };

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         navLinks.forEach((link) => link.classList.remove("active"));
//         document
//           .querySelector(`.nav-link[href="#${entry.target.id}"]`)
//           .classList.add("active");
//       }
//     });
//   }, observerOptions);

//   sections.forEach((section) => observer.observe(section));
// });

/***************************************************************** */
// MARK: Display Products
document.addEventListener("DOMContentLoaded", () => {
  const catalogContainer = document.querySelector(".cards");
  const products = getProducts(); // الحصول على المنتجات

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-xl-3", "col-lg-4", "col-sm-6", "col-6");

    productCard.innerHTML = `
      <div class="card cursor-pointer">
        <img src="${
          product.getImages()[0]
        }" alt="${product.getProductName()}" width="100%" height="300px" class="details" data-id="${product.getId()}">
        <div class="links">
          <ul>
            <li><a><i class="fa-solid fa-cart-shopping addToCart" data-id="${product.getId()}"></i></a></li>
            <li><a><i class="fa-regular fa-heart"></i></a></li>
            <li><a href="./datails.html?productId=${product.getId()}"><i class="fa-solid fa-circle-info"></i></a></li>
          </ul>
        </div>
        <div class="info p-2">
         
          <div>
           <span id='productCategory'>${product.getCategory()}</span>
            <span class="star text-warning ms-4">
              ${"★".repeat(Math.floor(product.getRating()))}
              ${product.getRating() % 1 ? "☆" : ""}
            </span>
          </div>
          <p class="h5 product-title" id='productItem'>${product.getProductName()}</p>
          <span id='price'>${product.getPrice()}$</span>
          <p class="stock-label ">InStock:<span> ${product.getStock()}</span></p>
        </div>
        <button class="addToCart" data-id="${product.getId()}">Add To Cart</button>
      </div>
    `;

    catalogContainer.appendChild(productCard);
  });

  // Delegate click event to .details images
  catalogContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("details")) {
      const productId = e.target.dataset.id;
      window.location.href = `./datails.html?productId=${productId}`;
    }
  });
});

/////MARK: addToCart
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("addToCart")) {
    const button = e.target;
    const card = button.closest(".card");
    const img = card.querySelector("img");
    const productId = button.dataset.id;
    const category = card.querySelector("#productCategory").textContent;
    const productItem = card.querySelector("#productItem").textContent;
    const price = card.querySelector("#price").textContent;

    // const product = {
    //   id: productId,
    //   img: img.src,
    //   name: productItem,
    //   category,
    //   price,
    //   quantity: 1,
    // };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    var realProduct = getProductById(productId);

    const existingProduct = cart.find((item) => item.id === productId);
    const stockLabel = card.querySelector(".stock-label span");
    // console.log(realProduct.getStock());
    // console.log(existingProduct);

    // console.log(existingProduct.quantity);

    if (existingProduct) {
      if (realProduct.getStock() != 0) {
        existingProduct.quantity += 1;
        showToast("Product added to cart");

        decreaseProductStock(productId);
        if (stockLabel) {
          stockLabel.textContent = realProduct.getStock();
        }
      } else {
        showToast("Stock limited reached.", "danger");
        return;
      }
    } else {
      if (realProduct.getStock() > 0) {
        const newProduct = {
          id: productId,
          img: img.src,
          name: productItem,
          category,
          price,
          quantity: 1,
        };

        cart.push(newProduct);
        decreaseProductStock(productId);
        if (stockLabel) {
          stockLabel.textContent = realProduct.getStock();
          console.log(stockLabel.textContent);
        }
        showToast("Product added to cart");
      } else {
        showToast("Stock limited reached.", "danger");
        return;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});

////////////////////////////////////////////////////////
//MARK:search bar
const searchIcon = document.querySelector(".fa-magnifying-glass");
const searchContainer = document.getElementById("search-container");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

const items = getProducts().map((product) => ({
  name: product.getProductName(),
  image: product.getImages()[0],
  price: `${product.getPrice()}$`,
  id: product.getId(),
}));

searchIcon.addEventListener("click", () => {
  if (
    searchContainer.style.display === "none" ||
    searchContainer.style.display === ""
  ) {
    searchContainer.style.display = "block";
    searchContainer.style.opacity = "0";
    searchContainer.style.transition = "opacity 0.5s ease-in-out";
    setTimeout(() => {
      searchContainer.style.opacity = "1";
    }, 0);
    searchInput.focus();
  } else {
    searchContainer.style.opacity = "0";
    setTimeout(() => {
      searchContainer.style.display = "none";
      searchResults.innerHTML = "";
      searchInput.value = "";
    }, 500);
  }
});

document.addEventListener("click", function (e) {
  const isClickInside =
    searchContainer.contains(e.target) || searchIcon.contains(e.target);

  if (!isClickInside) {
    searchContainer.style.opacity = "0";
    setTimeout(() => {
      searchContainer.style.display = "none";
      searchResults.innerHTML = "";
      searchInput.value = "";
    }, 500);
  }
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  searchResults.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>'; // Show loading indicator

  setTimeout(() => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    renderResults(filtered);
  }, 2000);
});

function renderResults(results) {
  searchResults.innerHTML = "";
  if (results.length === 0) {
    searchResults.innerHTML = '<p class="text-muted">No results found.</p>';
    return;
  }

  results.forEach((item) => {
    const div = document.createElement("div");
    div.className =
      "search-item d-flex align-items-center p-2 border-bottom cursor-pointer";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
      <div>
        <h6 class="mb-1">${item.name}</h6>
        <p class="mb-0 text-muted">${item.price}</p>

      </div>
    `;
    div.addEventListener("click", () => {
      window.location.href = `./datails.html?productId=${item.id}`;
    });
    searchResults.appendChild(div);
  });
}

// Filter Categories logic

// filter local storage
const categories = Array.from(
  new Set(getProducts().map((product) => product.getCategory()))
);
// static assets images paths
const categoryImagesPath = {
  tops: "../../../assets/imgs/Home/top1.jpg",
  // "furniture": "  ../../../assets/imgs/Home/furniture.jpg",
  other: "../../../assets/imgs/Home/other_products.jpg",
  // "clothing": "../../../assets/imgs/Home/clothing.jpg",
  tops: "../../../assets/imgs/Home/top1.jpg",
  "mens-shirts": "../../../assets/imgs/Home/man T-shirt1.jpg",
  "womens-dresses": "../../../assets/imgs/Home/Images/dress.jpg",
  "womens-jewellery": "../../../assets/imgs/Home/woman-Jewellery1.jpg",
  "sports-accessories": "../../../assets/imgs/Home/sport.jpg",
  "womens-bags": " ../../../assets/imgs/Home/bag.avif",
  "womens-shoes": "../../../assets/imgs/Home/woman shoes.jpg",
  "womens-watches": "../../../assets/imgs/Home/woman Watch.avif",
  fragrances: "../../../assets/imgs/Home/skin-care.jpg",
  "mens-shoes": "../../../assets/imgs/Home/man shoes.jpg",
  "mens-watches": "../../../assets/imgs/Home/man watch.avif",
};
// map categories to owl carousel and assign it to owl=demo and handle a defult image if key not found
const categoriesHTML = categories
  .map(
    (category) => `
  <div class="item">
    <img src="${
      categoryImagesPath[category] ||
      "../../../assets/imgs/Home/other_products.jpg"
    }" alt="" width="100%">
    <p class="fs-4">${category}</p>
  </div>
`
  )
  .join("");

// MARK:Display Category

document.getElementById("owl-demo").innerHTML = categoriesHTML;
// end of filter categories
// handle click on category
const categoryItems = document.querySelectorAll(".item");

categoryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const category = item.querySelector("p").textContent;
    // Navigate to categories page
    window.location.href = `./categories.html?category=${category}`;
  });
});

$("#sendBtn").click(function () {
  let messageID = 0;
  let message = getAllMessages()[getAllMessages().length - 1];
  if (!message) messageID = 1;
  else messageID = message.id + 1;

  let message2 = $("#textArea").val();
  if (message2) {
    pushMessage(messageID, current_user.name, current_user.phone, message2);

    $("#textArea").val("");

    Swal.fire({
      html: "<h1>Message sent successfully</h1>",
      icon: "success",
      draggable: true,
    });
  } else {
    Swal.fire({
      html: "<h1>Enter valid message!</h1>",
    });
  }
});
