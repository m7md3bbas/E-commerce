
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
