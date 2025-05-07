import {
  getProducts
} from "../../../../projectModules/productModule.js"; 

// $(document).ready(function () {
//   $("#owl-demo").owlCarousel({
//     autoPlay: 500,
//     items: 4,
//     itemsDesktop: [1199, 3],
//     itemsDesktopSmall: [979, 3],
//   });
// });



$(".cartHome").click(function () {
  $(this).css('cursor','pointer')
  window.location.href = '../Cart/cart.html'
});

function showToast(message, type = "success", duration = 1000) {
  const toast = document.createElement('div');
  toast.className = `alert alert-${type} toast-message shadow`;
  toast.textContent = message;
  toast.style.cssText = `
    min-width: 200px;
    margin-bottom: 10px;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  `;

  const container = document.getElementById('toastContainer');
  container.appendChild(toast);

  // Fade in
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 100);

  // Fade out & remove
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 100);
  }, duration);
}



document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null, // يراقب ضمن نافذة العرض
    threshold: 0.5 // يظهر عندما يكون 50% من العنصر مرئيًا
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        document.querySelector(`.nav-link[href="#${entry.target.id}"]`).classList.add("active");
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});



/***************************************************************** */


document.addEventListener("DOMContentLoaded", () => {
  const catalogContainer = document.querySelector(".cards");
  const products = getProducts(); // الحصول على المنتجات 

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-xl-3", "col-lg-4", "col-sm-6", "col-6");

    productCard.innerHTML = `
      <div class="card cursor-pointer">
        <img src="${product.getImages()[0]}" alt="${product.getProductName()}" width="100%" height="300px" class="details" data-id="${product.getId()}">
        <div class="links">
          <ul>
            <li><a><i class="fa-solid fa-cart-shopping addToCart "></i></a></li>
            <li><a><i class="fa-regular fa-heart "></i></a></li>
            <li><a href="./datails.html?productId=${product.getId()}"><i class="fa-solid fa-circle-info "></i></a></li>
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
          <p class="h5" style="max-width:1000px">${product.getProductName()}</p>
          <span>${product.getPrice()}$</span>
          <p class="h5" id='productItem'>${product.getProductName()}</p>
          <span id="price">${product.getPrice()}$</span>
        </div>
        <button class="addToCart"  data-id="${product.getId()}">Add To Cart</button>
      </div>
    `;

    catalogContainer.appendChild(productCard);
  });

  // Delegate click event to .details images
  catalogContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("details")) {
      const productId = e.target.dataset.id;
      window.location.href = `./datails.html?productId=${productId}`; // إضافة معرّف المنتج للرابط
      console.log("Navigating to details page with productId: ", productId);
    }
  });
});


  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('addToCart')) {
      const button = e.target;
      const card = button.closest('.card');
      const img = card.querySelector('img');
      const productId = button.dataset.id;
      const category = card.querySelector('#productCategory').textContent;
      const productItem = card.querySelector('#productItem').textContent;
      const price = card.querySelector('#price').textContent;
  
      const product = {
        id: productId,
        img: img.src,
        name: productItem,
        category,
        price: parseInt(price.replace(/\D/g, '')),
         quantity: 1
      };
  
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      console.log("Before adding:", cart); 
  
      const existingProduct = cart.find(item => item.id === productId);
      if (existingProduct) {
        existingProduct.quantity += 1; 
      } else {
        cart.push(product); 
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
  
      console.log("After adding:", cart); 
  
      showToast('Product added successfully to cart');
    }
  });
  

 
  