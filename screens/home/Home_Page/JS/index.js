
$(document).ready(function () {
  $("#owl-demo").owlCarousel({
    autoPlay: 500, //Set AutoPlay to 3 seconds

    items: 4,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [979, 3],
  });
});

$(".cartHome").click(function () {
  window.location.href='../Cart/cart.html'
});


// $('.addToCart').click(function(){
//   let category =$('#productCategory').val()
//   let productItem=$('#productItem').val()
//   let price=$('#price').val()
//   let card = this.closest('.card'); 
//   let img = card.querySelector('img');
//   let imgSrc=img.src

//   let item=`<div class="col-md-4 col-lg-3 ">
//                     <div class="card m-2 product" >
//                         <img src=${imgSrc} class="card-img-top" alt="productImg">
//                         <div class="card-body">
//                             <h2 class="main-color">${category}</h2>
//                             <p>${productItem}</p>
//                             <h4 >Price: <span class="text-secondary price" >${price}</span></h4>
//                             <h5>Total Price: <span class="text-secondary total-price"  >2000 EGP</span></h5>
//                          <hr>
                            
//                          <div class="d-flex justify-content-between align-items-center">
//                             <div class="btn-group"  role="group" aria-label="Basic outlined example">
//                                 <button type="button" class="btn btn-outline-light text-black border">-</button>
//                                 <button type="button" class="btn btn-outline-light text-black border">3</button>
//                                 <button type="button" class="btn btn-outline-light text-black border">+</button>
//                             </div>
//                             <div >
//                               <i  class="close-btn fa-solid fa-trash cursor-pointer fa-lg ms-auto" data-bs-dismiss="product" ></i>
//                               </div>
//                          </div>
//                         </div>
//                     </div>
//                 </div>`
  
//   addToCart(item)
//   alert('Product added successflly to cart')
// })

document.querySelectorAll('.addToCart').forEach(button => {
  button.addEventListener('click', function () {
    const card = this.closest('.card'); 
    const img = card.querySelector('img'); 
    const category = card.querySelector('#productCategory').textContent;
    const productItem = card.querySelector('#productItem').textContent;
    const price = card.querySelector('#price').textContent;

    const item = `
      <div class="col-md-4 col-lg-3">
        <div class="card m-2 product">
          <img src="${img.src}" class="card-img-top" alt="productImg">
          <div class="card-body">
            <h2 class="main-color">${category}</h2>
            <p>${productItem}</p>
            <h4>Price: <span class="text-secondary price">${price}</span></h4>
            <h5>Total Price: <span class="text-secondary total-price">2000 EGP</span></h5>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-light text-black border">-</button>
                <button type="button" class="btn btn-outline-light text-black border">3</button>
                <button type="button" class="btn btn-outline-light text-black border">+</button>
              </div>
              <div>
                <i class="close-btn fa-solid fa-trash cursor-pointer fa-lg ms-auto"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push(item);

    localStorage.setItem('cart', JSON.stringify(cart));

    


    alert('Product added successfully to cart');
  });
});



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