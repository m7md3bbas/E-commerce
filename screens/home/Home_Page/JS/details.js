
// استيراد الدوال والبيانات من ملف المنتج
document.addEventListener("DOMContentLoaded", () => {
    // جلب معرّف المنتج من URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

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
        var selectedProduct = savedProducts.find(product => product.id == productId);
        console.log("selectedProduct is ");
        console.log(selectedProduct);
        console.log(selectedProduct.productName);

          

        if (selectedProduct) {
          
            

            // select product-name from details page
            document.querySelector('.product-name').textContent = selectedProduct.productName;
            // select product-image from details page
            document.querySelector('.product-image').src = selectedProduct.images[0];
            // select product-description from details page
            document.querySelector('.product-description').textContent = selectedProduct.description;
            // select price from details page
            document.querySelector('.product-price').textContent = `$${selectedProduct.price}`;
            // select rating from details page
            document.querySelector('.rating').innerHTML = generateRatingStars(selectedProduct.rating);
           
            const productImages = selectedProduct.images;
            const thumbnailsContainer = document.querySelector('.image-thumbnails');
            thumbnailsContainer.innerHTML = '';
           /***********Same image For same Product***************************/ 
            productImages.forEach((imgSrc, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgSrc;
                thumb.alt = `Thumbnail ${index + 1}`;
                thumb.classList.add('thumbnail-image');
                thumb.style.width = '80px';
                thumb.style.height = '80px';
                thumb.style.cursor = 'pointer';
                thumb.style.objectFit = 'cover';
    
                thumb.addEventListener('click', () => {
                    document.querySelector('.product-image').src = imgSrc;
                });
    
                thumbnailsContainer.appendChild(thumb);
            });
            displayRelatedProducts(selectedProduct.category, selectedProduct.id);
        } else {
            console.log(urlParams);
            console.log(productId);
            console.error('Product not found!');
        }

        // displayRelatedProducts(selectedProduct?.getCategory());
    } else {
        console.error('Product ID not found!');
    }
});



// دالة لتوليد النجوم بناءً على التقييم
function generateRatingStars(rating) {
    let stars = '';
    for (let i = 0; i < Math.floor(rating); i++) {
        stars += '★';
    }
    if (rating % 1 !== 0) {
        stars += '☆'; // لإضافة نجمة غير مكتملة إذا كان التقييم عشري
    }
    return stars;
}


function displayRelatedProducts(category, currentProductId) {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    const related = allProducts.filter(
        product => product.category === category && product.id != currentProductId
    );

    const relatedContainer = document.querySelector('.related-products .cards');
    relatedContainer.innerHTML = ''; // لتفريغ المنتجات السابقة

    if (related.length === 0) {
        relatedContainer.innerHTML = '<p>No related products found.</p>';
        return;
    }

    related.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-xl-3 col-lg-4 col-sm-6 col-6';

        productCard.innerHTML = `
        <a href="./datails.html?productId=${product.id}" class="text-decoration-none text-dark">
        <div class="card">
            <img src="${product.images[0]}" alt="${product.productName}" class="related-image" />
            <div class="info p-2">
                <h4 class="related-name text-truncate">${product.productName}</h4>
                <div class="d-flex justify-content-between align-items-center px-2">
                    <p class="related-price mb-0">$${product.price}</p>
                    <span class="text-warning">${generateRatingStars(product.rating)}</span>
                </div>
            </div>
            <button class="w-100">Add To Cart</button>

        </div>
      `;
      
        relatedContainer.appendChild(productCard);
    });
}

/* <a href="details.html?productId=${product.id}" class="view-details">View Details</a> */

/*Size Button*/ 
document.addEventListener("DOMContentLoaded", () => {
    const sizeButtons = document.querySelectorAll(".size button");
    const selectedSizeSpan = document.querySelector(".size .num");

    sizeButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedSizeSpan.textContent = button.textContent;
        });
    });
});



