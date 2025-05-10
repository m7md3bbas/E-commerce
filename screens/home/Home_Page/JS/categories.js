import { getProductById ,decreaseProductStock} from "../../../../projectModules/productModule.js";


// MARK:Displaying 

// read category name from url 
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
//replace category name in categories nav li 
document.getElementById('categories').innerText = category;
//filter products with category name
const products = localStorage.getItem('products');
const filteredProducts = JSON.parse(products).filter(product => product.category == category);
//display filtered products in categories div
// Map products to html elements
filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-xl-3", "col-lg-4", "col-sm-6", "col-6");
    productCard.innerHTML = `
     <a href="./datails.html?productId=${product.id}" class="text-decoration-none text-dark">
            <div class="card cursor-pointer">
            <img src="${product.images[0]
        }" alt="${product.productName}" width="100%" height="300px" class="details" data-id="${product.id}">
        <div class="links">
          <ul>
            <li><a><i class="fa-solid fa-cart-shopping addToCart" data-id="${product.id}"></i></a></li>
            <li><a><i class="fa-regular fa-heart"></i></a></li>
            <li><a href="./datails.html?productId=${product.id}"><i class="fa-solid fa-circle-info"></i></a></li>
          </ul>
        </div>
        <div class="info p-2">
         
          <div>
           <span id='productCategory'>${product.category}</span>
            <span class="star text-warning ms-4">
              ${"★".repeat(Math.floor(product.rating))}
             </span>
          </div>
          <p class="h5 product-title" id='productItem'>${product.productName}</p>
          <span id='price'>${product.price}$</span>
          <p class="stock-label ">InStock:<span> ${product.stock}</span></p>
        </div>
        <button class="addToCart" data-id="${product.id}">Add To Cart</button>
      </div>
    `;
    var categoriesDiv = document.getElementById('categories-div').appendChild(productCard);

});



// MARK: Toast

function showToast(message, type = "success", duration = 2000) {
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
  }, 200);

  // Fade out & remove
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
    }, 200);
  }, duration);
}

////MARK: addToCart
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
    console.log(cart);

    var realProduct = getProductById(productId);

    const existingProduct = cart.find((item) => item.id === productId);
    const stockLabel = card.querySelector(".stock-label span");


    if (existingProduct) {
      if (existingProduct.quantity < realProduct.getStock()) {
        existingProduct.quantity += 1;
        showToast('Product added to cart')
        console.log(price);
        
         decreaseProductStock(productId)
       if (stockLabel) {
         stockLabel.textContent = realProduct.getStock();
         console.log( stockLabel.textContent);
         
         }

      } else {
        showToast("Stock limited reached.",'danger');
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
        decreaseProductStock(productId)
        if (stockLabel) {
              stockLabel.textContent = realProduct.getStock();
         console.log( stockLabel.textContent);

        }
        showToast('Product added to cart')

        console.log('Product added to cart');

      } else {
        showToast("Stock limited reached.",'danger');
        return;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(JSON.parse(localStorage.getItem('cart')));

  }
});
