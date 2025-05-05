const $ = selector => document.querySelector(selector);

const defaultImage = "https://placehold.co/600x400?text=No+Image";

function loadProducts() {
    const products = localStorage.getItem("products");
    try {
        return products ? JSON.parse(products) : [];
    } catch (e) {
        return [];
    }
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function updateProductCards() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    const products = loadProducts();

    products.forEach((product, index) => {
        const productImages = product.images || [defaultImage];
        const mainImage = productImages[0] || defaultImage;

        const productCard = document.createElement("div");
        productCard.className = "product-card position-relative border rounded p-3 m-2 shadow-sm";

        productCard.innerHTML = `
            <img class="product-image" src="${mainImage}" alt="${product.name || 'Product Image'}">
            <div>
                <h5 class="mt-2">${product.name || 'No Name'}</h5>
                <p>Price: ${product.price?.toFixed(2) || '0.00'} EGP</p>
                <p>Quantity: ${product.quantity || '0'}</p>
                <button class="btn btn-sm btn-outline-primary view-details" data-index="${index}">
                    View Details
                </button>
            </div>
        `;
        productList.appendChild(productCard);
    });

    document.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", function () {
            const product = loadProducts()[this.dataset.index];
            showProductModal(product);
        });
    });
}

function showPage(page) {
    document.querySelectorAll('.page-content').forEach(content => {
        content.classList.remove('active');
    });

    document.getElementById(page).classList.add('active');

    document.querySelectorAll('.sidebar a').forEach(anchor => {
        anchor.classList.remove('active');
    });

    document.getElementById(page + 'Link').classList.add('active');
}

function addProduct() {
    const nameAr = $("#productName").value.trim();
    const nameEn = $("#productNameEn").value.trim();
    const price = parseFloat($("#productPrice").value);
    const quantity = parseInt($("#productQuantity").value);
    const image = $("#productImage").value.trim() || defaultImage;

    if (!nameAr || !nameEn || isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
        showNotification("Please fill out all fields correctly.", "error");
        return;
    }

    const products = loadProducts();
    const newProduct = {
        id: products.length + 1,
        name: { ar: nameAr, en: nameEn },
        price,
        quantity,
        images: [image],
        sellerId: 1,
        rateAvg: 0,
        reviews: [],
        createdTime: new Date().toISOString(),
        category: "uncategorized",
        description: "",
        seller: "",
        sellerEmail: ""
    };

    products.push(newProduct);
    saveProducts(products);
    updateProductCards();
    $("#addProductForm").reset();

    showNotification("Product added successfully!", "success");
}

function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showProductModal(product) {
    const productImages = product.images || [defaultImage];

    document.getElementById("modalProductName").textContent = product.name || 'No Name';
    document.getElementById("modalProductPrice").textContent = (product.price?.toFixed(2) || '0.00') + " EGP";
    document.getElementById("modalProductQuantity").textContent = product.quantity || '0';

    mapImagesToCarousel(productImages);
    new bootstrap.Modal(document.getElementById("productModal")).show();
}

function mapImagesToCarousel(images = [defaultImage]) {
    const myCarousel = document.getElementById("mycarousel");

    let carouselInner = myCarousel.querySelector(".carousel-inner");
    if (!carouselInner) {
        carouselInner = document.createElement("div");
        carouselInner.className = "carousel-inner";
        myCarousel.appendChild(carouselInner);
    } else {
        carouselInner.innerHTML = "";
    }

    let carouselIndicators = myCarousel.querySelector(".carousel-indicators");
    if (!carouselIndicators) {
        carouselIndicators = document.createElement("div");
        carouselIndicators.className = "carousel-indicators";
        myCarousel.appendChild(carouselIndicators);
    } else {
        carouselIndicators.innerHTML = "";
    }

    myCarousel.setAttribute('data-bs-interval', '1500');

    images.forEach((img, index) => {
        const item = document.createElement("div");
        item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        const imgElement = document.createElement("img");
        imgElement.src = img || defaultImage;
        imgElement.alt = "Product Image";
        imgElement.className = "d-block w-100 carousel-image";

        item.appendChild(imgElement);
        carouselInner.appendChild(item);

        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.dataset.bsTarget = "#mycarousel";
        indicator.dataset.bsSlideTo = index;
        indicator.className = index === 0 ? 'active' : '';
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        carouselIndicators.appendChild(indicator);
    });

    const carousel = new bootstrap.Carousel(myCarousel);
}

function searchProducts() {
    const searchInput = document.getElementById("searchInput");
    const searchValue = searchInput.value.toLowerCase();
    const products = document.querySelectorAll(".product-card");

    let found = false;
    products.forEach(product => {
        const productName = product.querySelector("h5").textContent.toLowerCase();
        if (productName.includes(searchValue)) {
            product.style.display = "block";
            found = true;
        } else {
            product.style.display = "none";
        }
    });

    if (!found && searchValue.length > 0) {
        showNotification("Product not found", "error");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("products")) {
        saveProducts([
            {
                id: 1,
                sellerId: 1,
                rateAvg: 4.5,
                name: "Men's T-shirt",
                price: 200,
                images: [
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDZtF5rfMcbRQtx72_ahxf5VF5sCq4KW_OEA&s"
                ],
                category: "clothing",
                quantity: 10,
                description: "High quality cotton t-shirt",
                seller: "Fashion Store",
                sellerEmail: "fashion@example.com"
            },
            {
                id: 2,
                sellerId: 1,
                rateAvg: 4.5,
                name: "Wrist Watch",
                price: 350,
                images: [
                    "https://m.media-amazon.com/images/I/610OiiTm9PL.jpg"
                ],
                category: "accessories",
                quantity: 10,
                description: "Luxury wrist watch",
                seller: "Watch Store",
                sellerEmail: "watches@example.com"
            },
            {
                id: 3,
                sellerId: 1,
                rateAvg: 4.5,
                name: "Wireless Earbuds",
                price: 500,
                images: [
                    "https://three-egypt.com/cdn/shop/files/AweiTrueWirelessSportsEarbudsT26Prothreestore_5.webp?v=1720103238"
                ],
                category: "electronics",
                quantity: 10,
                description: "High quality wireless earbuds",
                seller: "Audio Store",
                sellerEmail: "audio@example.com"
            }
        ]);
    }

    updateProductCards();
});
