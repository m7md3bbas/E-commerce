// استيراد الدوال والبيانات من ملف المنتج
import { getProductById, getProducts } from '../../../../projectModules/productModule.js';

document.addEventListener("DOMContentLoaded", () => {
    // جلب معرّف المنتج من URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    if (productId) {
        // استعراض المنتج بناءً على الـ productId
        const product = getProductById(productId);
        
        if (product) {
            // عرض تفاصيل المنتج في الصفحة
            displayProductDetails(product);
        } else {
            console.error('Product not found!');
        }

        // عرض المنتجات ذات الصلة بناءً على التصنيف
        displayRelatedProducts(product?.getCategory());
    } else {
        console.error('Product ID not found!');
    }
});

// دالة لعرض تفاصيل المنتج في الصفحة
function displayProductDetails(product) {
    // تحديد العناصر في الصفحة
    document.querySelector('.product-name').textContent = product.getProductName();
    document.querySelector('.product-image').src = product.getImages()[0]; // عرض أول صورة من الصور
    document.querySelector('.product-description').textContent = product.getDescription();
    document.querySelector('.price').textContent = `$${product.getPrice()}`;
    document.querySelector('.rating').innerHTML = generateRatingStars(product.getRating());
    
    // يمكن إضافة تفاصيل أخرى مثل المراجعات والمزيد
    document.querySelector('.seller-info').textContent = `Sold by: ${product.getSeller()}`;
    document.querySelector('.product-category').textContent = `Category: ${product.getCategory()}`;
}

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

// دالة لعرض المنتجات ذات الصلة
function displayRelatedProducts(category) {
    const relatedProducts = getProducts().filter(product => product.getCategory() === category);
    
    const relatedProductContainer = document.querySelector('.related-products');
    relatedProductContainer.innerHTML = ''; // مسح المنتجات السابقة

    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-xl-3', 'col-lg-4', 'col-md-4', 'col-sm-6', 'col-6');
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.getImages()[0]}" alt="${product.getProductName()}" width="100%">
                <div class="info p-2">
                    <p class="h5">${product.getProductName()}</p>
                    <span>${product.getPrice()}$</span>
                </div>
                <button>Add To Cart</button>
            </div>
        `;
        relatedProductContainer.appendChild(productCard);
    });
}
