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
            // select seller-info from details page
            // document.querySelector('.seller-info').textContent = `Sold by: ${selectedProduct.seller}`;
            // select product-category from details page
            // document.querySelector('.product-category').textContent = `Category: ${selectedProduct.category}`;
            // show related products 
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

    // تصفية المنتجات اللي من نفس الكاتيجوري وباستثناء المنتج المعروض
    const related = allProducts.filter(
        product => product.category === category && product.id !== currentProductId
    );

    const relatedContainer = document.querySelector('.related-products');

    if (related.length === 0) {
        relatedContainer.innerHTML = '<p>No related products found.</p>';
        return;
    }

    related.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="${product.productName}" class="related-image" />
            <h4 class="related-name">${product.productName}</h4>
            <p class="related-price">$${product.price}</p>
            <a href="product-details.html?productId=${product.id}" class="view-details">View Details</a>
        `;

        relatedContainer.appendChild(productCard);
    });
}
