let currentLang = localStorage.getItem("lang") || 'ar';

const $ = selector => document.querySelector(selector);

const translations = {
    en: {
        sellerPanel: "Seller Panel",
        homeLink: "Home",
        addProductLink: "Add Product",
        manageProductsLink: "Manage Products",
        ordersLink: "Orders",
        analyticsLink: "Sales Analytics",
        accountLink: "Account Settings",
        yourProducts: "Your Products",
        addProductHeader: "Add New Product",
        nameLabel: "Product Name (AR)",
        nameEnLabel: "Product Name (EN)",
        priceLabel: "Price",
        imageLabel: "Image URL",
        submitBtn: "Add",
        addProductMessage: "Please fill out all fields correctly.",
        addProductSuccess: "Product added successfully!",
        quantityLabel: "Quantity",
    },
    ar: {
        sellerPanel: "لوحة البائع",
        homeLink: "الرئيسية",
        addProductLink: "إضافة منتج",
        manageProductsLink: "إدارة المنتجات",
        ordersLink: "الطلبات",
        analyticsLink: "إحصائيات المبيعات",
        accountLink: "إعدادات الحساب",
        yourProducts: "منتجاتك",
        addProductHeader: "إضافة منتج جديد",
        nameLabel: "اسم المنتج (عربي)",
        nameEnLabel: "اسم المنتج (إنجليزي)",
        priceLabel: "السعر",
        imageLabel: "رابط الصورة",
        submitBtn: "إضافة",
        addProductMessage: "يرجى ملء جميع الحقول بشكل صحيح.",
        addProductSuccess: "تمت إضافة المنتج بنجاح!",
        quantityLabel: "الكمية",
    }
};

const defaultImage = "https://placehold.co/400";

function applyLanguage() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    $(".lang-toggle").innerText = currentLang === 'ar' ? 'EN' : 'AR';

    for (const key in translations[currentLang]) {
        const element = document.getElementById(key);
        if (element) element.innerText = translations[currentLang][key];
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem("lang", currentLang);
    applyLanguage();
    updateProductCards();
}


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
    const productList = $("#product-list");
    productList.innerHTML = "";

    const products = loadProducts();

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name[currentLang]}" class="img-fluid">
            <h5 class="mt-2">${product.name[currentLang]}</h5>
            <p>${translations[currentLang].priceLabel}: ${product.price.toFixed(2)} EGP</p>
            <p>الكمية: ${product.quantity}</p> <!-- عرض الكمية -->
        `;
        productList.appendChild(productCard);
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
    const quantity = parseInt($("#productQuantity").value);  // إضافة الكمية
    const image = $("#productImage").value.trim() || defaultImage;

    if (!nameAr || !nameEn || isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
        showNotification(translations[currentLang].addProductMessage, "error");
        return;
    }

    const products = loadProducts();
    const newProduct = {
        id: products.length + 1,
        name: { ar: nameAr, en: nameEn },
        price,
        quantity,  // إضافة الكمية
        image
    };

    products.push(newProduct);
    saveProducts(products);
    updateProductCards();
    $("#addProductForm").reset();

    showNotification(translations[currentLang].addProductSuccess, "success");
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

document.addEventListener("DOMContentLoaded", () => {
    applyLanguage();

    if (!localStorage.getItem("products")) {
        saveProducts([
            {
                productId: 1,
                sellerId: 1,
                rateAvg: 4.5,
                name: { ar: "تيشيرت رجالي", en: "Men's T-shirt" },
                price: 200,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDZtF5rfMcbRQtx72_ahxf5VF5sCq4KW_OEA&s",
                category: "electronics",
                quantity: 10,
            },
            {
                id: 2,
                name: { ar: "ساعة يد", en: "Wrist Watch" },
                price: 350,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVXWZJM4R65A4N4u2UfV2ztQE653eoNqvKtw&s"
            },
            {
                id: 3,
                name: { ar: "سماعات لاسلكية", en: "Wireless Earbuds" },
                price: 500,
                image: "https://cdn-ilbfkgh.nitrocdn.com/ufOfZzcZUionBYkswpRXSFNIvhnpfCcf/assets/images/optimized/rev-12e2347/ehabgroup.com/media/2025/02/apple-airpods-4-anc-.png"
            }
        ]);
    }

    updateProductCards();

    // Image preview logic
    $("#productImageUpload").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // Set the image preview source
                $("#imagePreview").src = reader.result;
                // Make the preview container visible
                $("#imagePreviewContainer").style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

});

async function testGetProducts() {
    await fetch('data.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error loading JSON file:', error));
}
testGetProducts();
