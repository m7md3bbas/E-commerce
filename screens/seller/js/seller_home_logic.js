const $ = selector => document.querySelector(selector);
const defaultImage = "https://placehold.co/600x400?text=No+Image";

// load products
function loadProducts() {
    const products = localStorage.getItem("products");
    if (products) {
        displaySellerName();
    }

    try {
        return products ? JSON.parse(products) : [];

    } catch (e) {
        return [];
    }
}
// display seller Name
function displaySellerName() {
    const sellerName = JSON.parse(localStorage.getItem("current_user")).name;
    // target profile_icon and display seller name
    const sellerNameElement = document.getElementById("profile_icon");
    if (sellerNameElement) {
        sellerNameElement.title = sellerName;

    }
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function updateProductCards() {
    const productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";
    const products = loadProducts();
    // filter products by seller email

    // read seller email from local storage "currentUser"
    const sellerEmail = JSON.parse(localStorage.getItem("current_user")).email;
    const filteredProductsBySeller = products.filter(product => product.sellerEmail === sellerEmail);
    console.log(filteredProductsBySeller);
    console.log(sellerEmail);


    if (filteredProductsBySeller) {
        filteredProductsBySeller.forEach((product, index) => {
            const productImages = product.images || [defaultImage];
            const mainImage = productImages[1] || defaultImage;

            const productCard = document.createElement("div");
            productCard.className = "product-card position-relative border rounded p-3 m-2 shadow-sm";

            productCard.innerHTML = `
            <img class="product-image" src="${mainImage}" alt="${product.productName || 'Product Image'}">
            <div>
                <h5 class="mt-2">${product.productName || 'No Name'}</h5>
                <p>Price: ${product.price?.toFixed(2) || '0.00'} $</p>
                <p>Quantity: ${product.stock || '0'}</p>
                <button class="btn btn-sm btn-outline-primary view-details" data-index="${index}">
                    View Details
                </button>
            </div>
        `;
            productList.appendChild(productCard);
        });

        document.querySelectorAll(".view-details").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                const product = filteredProductsBySeller[index];
                showProductModal(product);
            });
        });
    }
    else {
        const productCard = document.createElement("div");
        productCard.className = "product-card position-relative border rounded p-3 m-2 shadow-sm";
        productCard.innerHTML = `
            <h5 class="mt-2">No Products Found</h5>
        `;
        productList.appendChild(productCard);
    }
}

function updateProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    tbody.innerHTML = "";
    const products = loadProducts();
    // filter products by seller email
    // read seller email from local storage "currentUser"
    const sellerEmail = JSON.parse(localStorage.getItem("current_user")).email;
    const filteredProductsBySeller = products.filter(product => product.sellerEmail === sellerEmail);


    filteredProductsBySeller.forEach(product => {
        const mainImage = product.images?.[0] || defaultImage;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${mainImage}" alt="${product.productName}" style="width: 50px; height: 50px; object-fit: cover;"></td>
            <td>${product.productName || 'No Name'}</td>
            <td>${product.category || 'Uncategorized'}</td>
            <td>${product.price?.toFixed(2) || '0.00'} $</td>
            <td>${product.stock || '0'}</td>
            <td>${product.rating || '0'}</td>
            <td>
                <button class=" btn-sm  edit-product" data-id="${product.id}">Edit</button>
                <button class=" btn-sm  delete-product" data-id="${product.id}" id="deleteProductBtn">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll('.edit-product').forEach(btn => {
        btn.addEventListener('click', () => showEditModal(btn.dataset.id));
    });

    document.querySelectorAll('.delete-product').forEach(btn => {
        btn.addEventListener('click', () => deleteProduct(btn.dataset.id));
    });
}

function showPage(page) {
    document.querySelectorAll('.page-content').forEach(content => {
        content.classList.remove('active');
    });

    document.querySelectorAll('.sidebar a').forEach(anchor => {
        anchor.classList.remove('active');
    });

    const pageElement = document.getElementById(page);
    const pageLink = document.getElementById(page + 'Link');

    if (pageElement) pageElement.classList.add('active');
    if (pageLink) pageLink.classList.add('active');

    if (page === 'manageProducts') {
        updateProductsTable();
        setupManageProductsPage();
    } else if (page === 'home') {
        updateProductCards();
    }
    if (page === 'orders') {
        displayOrders();
    }
    if (page === 'analytics') {
        loadSalesAnalytics();
    }
}

function showEditModal(productId) {
    const products = loadProducts();
    const product = products.find(p => p.id == productId);
    if (!product) return;

    const modalBody = document.getElementById('editProductForm');
    if (!modalBody) return;

    modalBody.innerHTML = `
        <div class="mb-3">
            <label for="editProductName" class="form-label">Product Name </label>
            <input type="text" class="form-control" id="editProductName" value="${product.productName || ''}">
        </div>
        <div class="mb-3">
            <label for="editProductPrice" class="form-label">Price</label>
            <input type="number" step="0.01" class="form-control" id="editProductPrice" value="${product.price || ''}">
        </div>
        <div class="mb-3">
            <label for="editProductQuantity" class="form-label">Quantity</label>
            <input type="number" class="form-control" id="editProductQuantity" value="${product.stock || ''}">
        </div>
        <div class="mb-3">
            <label for="editProductCategory" class="form-label">Category</label>
            <select class="form-select" id="editProductCategory">
                <option value="uncategorized" ${product.category === 'uncategorized' ? 'selected' : ''}>Uncategorized</option>
                <option value="tops" ${product.category === 'tops' ? 'selected' : ''}>tops</option>
                <option value="mens-shirts" ${product.category === 'mens-shirts' ? 'selected' : ''}>mens-shirts</option>
                <option value="womens-dresses" ${product.category === 'womens-dresses' ? 'selected' : ''}>womens-dresses</option>
                <option value="womens-jewellery" ${product.category === 'womens-jewellery' ? 'selected' : ''}>womens-jewellery</option>
                <option value="sports-accessories" ${product.category === 'sports-accessories' ? 'selected' : ''}>sports-accessories</option>
                <option value="womens-bags" ${product.category === 'womens-bags' ? 'selected' : ''}>womens-bags</option>
                <option value="womens-shoes" ${product.category === 'womens-shoes' ? 'selected' : ''}>womens-shoes</option>
                <option value="womens-watches" ${product.category === 'womens-watches' ? 'selected' : ''}>womens-watches</option>
                <option value="fragrances" ${product.category === 'fragrances' ? 'selected' : ''}>fragrances</option>
                <option value="mens-shoes" ${product.category === 'mens-shoes' ? 'selected' : ''}>mens-shoes</option>
                <option value="mens-watches" ${product.category === 'mens-watches' ? 'selected' : ''}>mens-watches</option>
                <option value="furniture" ${product.category === 'furniture' ? 'selected' : ''}>Furniture</option>
                <option value="other" ${product.category === 'other' ? 'selected' : ''}>Other</option>

            </select>
        </div>
        <div class="mb-3">
            <label for="editProductDescription" class="form-label">Description</label>
            <textarea class="form-control" id="editProductDescription">${product.description || ''}</textarea>
        </div>
        <div class="mb-3">
            <label for="editProductImages" class="form-label">Images (comma separated URLs)</label>
            <input type="text" class="form-control" id="editProductImages" value="${product.images?.join(', ') || ''}">
        </div>
    `;

    const saveBtn = document.getElementById('saveProductChanges');
    if (saveBtn) saveBtn.dataset.id = productId;

    new bootstrap.Modal(document.getElementById('editProductModal')).show();
}

function saveEditedProduct() {
    const saveBtn = document.getElementById('saveProductChanges');
    if (!saveBtn) return;

    const productId = saveBtn.dataset.id;
    const products = loadProducts();
    const productIndex = products.findIndex(p => p.id == productId);
    if (productIndex === -1) return;

    const name = document.getElementById('editProductName')?.value.trim();
    const price = parseFloat(document.getElementById('editProductPrice')?.value);
    const quantity = parseInt(document.getElementById('editProductQuantity')?.value);
    const category = document.getElementById('editProductCategory')?.value;
    const description = document.getElementById('editProductDescription')?.value.trim();
    const images = document.getElementById('editProductImages')?.value
        .split(',')
        .map(url => url.trim())
        .filter(url => url);

    if (!name || isNaN(price) || isNaN(quantity)) {
        showNotification('Please fill required fields correctly', 'error');
        return;
    }

    products[productIndex] = {
        ...products[productIndex],
        productName: name,
        price,
        stock: quantity,
        category,
        description,
        images,

    };

    saveProducts(products);
    updateProductsTable();
    updateProductCards();
    bootstrap.Modal.getInstance(document.getElementById('editProductModal')).hide();
    showNotification('Product updated successfully!', 'success');
}

function deleteProduct(productId) {
    const products = loadProducts();
    productId = parseInt(productId);

    const product = products.find(p => parseInt(p.id) === productId);
    if (!product) return;

    Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to delete "${product.productName}"? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            const updatedProducts = products.filter(p => parseInt(p.id) !== productId);

            // إعادة تعيين IDs للمنتجات المتبقية
            updatedProducts.forEach((product, index) => {
                product.id = index + 1;
            });

            saveProducts(updatedProducts);
            updateProductsTable();
            updateProductCards();

            Swal.fire({
                title: "Deleted!",
                text: `"${product.productName}" has been deleted successfully.`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}


function filterAndSortProducts() {
    const searchTerm = document.getElementById('productSearch')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const sortOption = document.getElementById('sortProducts')?.value || 'name-asc';

    let products = loadProducts();


    // التصفية حسب البحث
    if (searchTerm) {
        products = products.filter(p =>
        (p.name?.en?.toLowerCase().includes(searchTerm) ||
            (p.name?.ar?.toLowerCase().includes(searchTerm)) ||
            (typeof p.name === 'string' && p.name.toLowerCase().includes(searchTerm))
        )
        );
    }

    // التصفية حسب الفئة
    if (categoryFilter) {
        products = products.filter(p => p.category === categoryFilter);
    }

    // الترتيب
    switch (sortOption) {
        case 'name-asc':
            products.sort((a, b) => {
                const nameA = a.name?.en || a.name || '';
                const nameB = b.name?.en || b.name || '';
                return nameA.localeCompare(nameB);
            });
            break;
        case 'name-desc':
            products.sort((a, b) => {
                const nameA = a.name?.en || a.name || '';
                const nameB = b.name?.en || b.name || '';
                return nameB.localeCompare(nameA);
            });
            break;
        case 'price-asc':
            products.sort((a, b) => (a.price || 0) - (b.price || 0));
            break;
        case 'price-desc':
            products.sort((a, b) => (b.price || 0) - (a.price || 0));
            break;
    }

    // عرض النتائج المصفاة
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    tbody.innerHTML = products.length === 0
        ? '<tr><td colspan="8" class="text-center">No products found</td></tr>'
        : products.map(product => {
            const mainImage = product.images?.[0] || defaultImage;
            return `
                <tr>
                    <td>${product.id}</td>
                    <td><img src="${mainImage}" alt="${product.productName}" style="width: 50px; height: 50px; object-fit: cover;"></td>
                    <td>${product.productName?.en || product.productName || 'No Name'}</td>
                    <td>${product.category || 'Uncategorized'}</td>
                    <td>${product.price?.toFixed(2) || '0.00'} $</td>
                    <td>${product.stock || '0'}</td>
                    <td>${product.rating || '0'}</td>
                    <td>
                        <button class="  roundedButton edit-product" data-id="${product.id}">Edit</button>
                        <button class="btn-sm btn-danger delete-product" data-id="${product.id}">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');

    // إعادة ربط معالجات الأحداث
    document.querySelectorAll('.edit-product').forEach(btn => {
        btn.addEventListener('click', () => showEditModal(btn.dataset.id));
    });
    document.querySelectorAll('.delete-product').forEach(btn => {
        btn.addEventListener('click', () => deleteProduct(btn.dataset.id));
    });
}

function resetFilters() {
    const productSearch = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortProducts = document.getElementById('sortProducts');

    if (productSearch) productSearch.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (sortProducts) sortProducts.value = 'name-asc';

    updateProductsTable();
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
    // Exclude first image
    const productImages = product.images?.slice(1) || [defaultImage];
    const modalProductName = document.getElementById("modalProductName");
    const modalProductPrice = document.getElementById("modalProductPrice");
    const modalProductQuantity = document.getElementById("modalProductQuantity");
    const modalProductDescription = document.getElementById("modalProductDescription");
    const modalProductCategory = document.getElementById("modalProductCategory");


    if (modalProductName) modalProductName.textContent = product.productName || 'No Name';
    if (modalProductPrice) modalProductPrice.textContent = (product.price?.toFixed(2) || '0.00') + " $";
    if (modalProductQuantity) modalProductQuantity.textContent = product.stock || '0';
    if (modalProductDescription) modalProductDescription.textContent = product.description || 'No Description';
    if (modalProductCategory) modalProductCategory.textContent = product.category || 'Uncategorized';
    mapImagesToCarousel(productImages);
    new bootstrap.Modal(document.getElementById("productModal")).show();
}

function mapImagesToCarousel(images = [defaultImage]) {
    const myCarousel = document.getElementById("mycarousel");
    if (!myCarousel) return;

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

    new bootstrap.Carousel(myCarousel);
}

function searchProducts() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    const searchValue = searchInput.value.toLowerCase();
    const products = document.querySelectorAll(".product-card");
    let found = false;

    products.forEach(product => {
        const productName = product.querySelector("h5")?.textContent.toLowerCase();
        if (productName?.includes(searchValue)) {
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

function setupManageProductsPage() {
    const productSearch = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortProducts = document.getElementById('sortProducts');
    const resetFilters = document.getElementById('resetFilters');
    const saveProductChanges = document.getElementById('saveProductChanges');

    if (productSearch) productSearch.addEventListener('input', filterAndSortProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterAndSortProducts);
    if (sortProducts) sortProducts.addEventListener('change', filterAndSortProducts);
    if (resetFilters) resetFilters.addEventListener('click', resetFilters);
    if (saveProductChanges) saveProductChanges.addEventListener('click', saveEditedProduct);
}

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("products")) {
        saveProducts([
            {
                id: 1,
                productName: "Product 1",
                category: "Category 1",
                description: "Description 1",
                price: 10,
                stock: 10,
                images: [defaultImage],
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                productName: "Product 2",
                category: "Category 2",
                description: "Description 2",
                price: 20,
                stock: 20,
                images: [defaultImage],
                createdAt: new Date().toISOString()
            }

        ]);
    }

    // تحديد الصفحة الحالية من الـ hash في URL
    const currentPage = window.location.hash.substring(1) || 'home';
    showPage(currentPage);

    // إضافة معالجات الأحداث للروابط الجانبية
    document.querySelectorAll('.sidebar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.id.replace('Link', '');
            window.location.hash = page;
            showPage(page);
        });
    });
});


// orders logic


function displayOrders() {
    const purchases = JSON.parse(localStorage.getItem('purchases_storage')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const buyers = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('current_user')) || {};

    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';

    // فلترة منتجات البائع الحالي
    const sellerProductsIds = products
        .filter(p => p.sellerEmail === currentUser.email)
        .map(p => p.id);

    // فلترة الطلبات الخاصة بمنتجات البائع
    const sellerPurchases = purchases.filter(p => sellerProductsIds.includes(p.productId));

    sellerPurchases.forEach((purchase, index) => {
        const product = products.find(p => p.id == purchase.productId);
        const buyer = buyers.find(b => b.id == purchase.buyerId);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${purchase.id}</td>
            <td>
                <strong>${buyer?.name || 'Unknown'}</strong><br>
                <small>${buyer?.phone || ''}</small>
            </td>
            <td>${product?.productName || 'Unknown'}</td>
            <td>${product?.price ? product.price + ' $' : '--'}</td>
            <td>1</td>
            <td>${buyer?.address || 'N/A'}</td>
            <td>${purchase.dateOfPurchase}</td>
            <td>
                <span class="badge ${purchase.status === 'shipped' ? 'bg-success' : 'bg-warning'}">
                    ${purchase.status === 'shipped' ? 'Delivered' : 'Pending'}
                </span>
            </td>
            <td>
                <select class="form-select form-select-sm" onchange="updatePurchaseStatus('${purchase.id}', this.value)">
                    <option value="pending" ${purchase.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="shipped" ${purchase.status === 'shipped' ? 'selected' : ''}>Delivered</option>
                </select>
            </td>
        `;
        tbody.appendChild(row);
    });
}


function updatePurchaseStatus(orderId, newStatus) {
    const purchases = JSON.parse(localStorage.getItem('purchases_storage')) || [];
    const updatedPurchases = purchases.map(p => {
        if (p.id == orderId) {
            return { ...p, status: newStatus };
        }
        return p;
    });
    localStorage.setItem('purchases_storage', JSON.stringify(updatedPurchases));
    displayOrders();
}



function updateOrderStatus(index, newStatus) {
    sampleOrders[index].status = newStatus;
    displayOrders();
}

function searchOrders() {
    const input = document.getElementById("orderSearchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#ordersTableBody tr");

    rows.forEach(row => {
        const rowText = row.innerText.toLowerCase();
        row.style.display = rowText.includes(input) ? "" : "none";
    });
}

// sales analytics
// This function should be called when the analytics page is shown
function loadSalesAnalytics() {
    const allPurchases = JSON.parse(localStorage.getItem('purchases_storage')) || [];
    const currentUsers = JSON.parse(localStorage.getItem('current_user')) || {};
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // log
    console.log("All Purchases:", allPurchases);
    console.log("Current User:", currentUsers);
    console.log("Products:", products);
    console.log("Users:", users);

    //get products ids that belong to the current seller using seller email 
    const sellerProductsIds = products.filter(p => p.sellerEmail == currentUsers.email).map(p => p.id);

    // فلترة عمليات الشراء الخاصة بمنتجات البائع فقط
    const purchases = allPurchases.filter(p => sellerProductsIds.includes(p.productId));

    console.log("Current Seller ID:", currentUsers.id);
    console.log("Seller's Product IDs:", sellerProductsIds);
    console.log("Filtered Purchases for this seller:", purchases);

    const monthlySales = {};
    const productSales = {};
    const revenuePerProduct = {};
    const addressCount = {};
    const customerOrders = {};

    let totalRevenue = 0;
    let totalOrders = purchases.length;

    purchases.forEach(purchase => {
        const date = new Date(purchase.dateOfPurchase);
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

        const product = products.find(p => p.id == purchase.productId);
        const user = users.find(u => u.id == purchase.buyerId);

        if (!product || !user) return;

        const price = product.price || 0;
        const address = user.address || 'Unknown';
        const productName = product.productName || 'Unnamed Product';
        const buyerId = user.id;

        monthlySales[monthKey] = (monthlySales[monthKey] || 0) + price;
        productSales[productName] = (productSales[productName] || 0) + 1;
        revenuePerProduct[productName] = (revenuePerProduct[productName] || 0) + price;
        addressCount[address] = (addressCount[address] || 0) + 1;
        customerOrders[buyerId] = (customerOrders[buyerId] || 0) + 1;

        totalRevenue += price;
    });

    // استخراج البيانات الأهم
    const topProduct = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0];
    const topRevenueProduct = Object.entries(revenuePerProduct).sort((a, b) => b[1] - a[1])[0];
    const topCustomer = Object.entries(customerOrders).sort((a, b) => b[1] - a[1])[0];
    const topAddress = Object.entries(addressCount).sort((a, b) => b[1] - a[1])[0];

    const topCustomerName = topCustomer ? (users.find(u => u.id == topCustomer[0])?.name || 'Unknown') : null;

    // تحديث البيانات في الصفحة
    document.getElementById('totalSales').textContent = `${totalRevenue} $`;

    document.getElementById('topProduct').textContent = topProduct
        ? `${topProduct[0]} (${topProduct[1]} sales)`
        : 'N/A';

    document.getElementById('topAddress').textContent = topAddress
        ? `${topAddress[0]} (${topAddress[1]} orders)`
        : 'N/A';

    document.getElementById('topRevenueProduct').textContent = topRevenueProduct
        ? `${topRevenueProduct[0]} (${topRevenueProduct[1]} EGP)`
        : 'N/A';

    document.getElementById('topCustomer').textContent = (topCustomer && topCustomerName)
        ? `${topCustomerName} (${topCustomer[1]} orders)`
        : 'N/A';

    document.getElementById('totalOrdersNum').textContent = totalOrders + " Order";

    // حذف الرسم القديم لو موجود
    if (window.salesChart && window.salesChart.destroy) {
        window.salesChart.destroy();
    }

    // رسم الإيرادات الشهرية
    const ctx = document.getElementById('salesChart').getContext('2d');
    window.salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(monthlySales),
            datasets: [{
                label: 'Monthly Revenue',
                data: Object.values(monthlySales),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function logout() {
    localStorage.removeItem("current_user");
    window.location.replace("../../auth/login.html");

}

function goToRewaq() {
    window.location.replace("../../home/Home_Page/index.html");
}


