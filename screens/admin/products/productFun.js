import { getProductById } from "../../../projectModules/productModule.js";

export function showItem() {
  $(".showBtn").click(function () {
    const productId = $(this).data("id");
    const product = getProductById(productId + "");
    console.log(getProductById(productId + "").getProductName());

    // product = $(this).data('id')
    // const productImages = product.getImages();
    const modalProductName = document.getElementById("modalProductName");
    const modalProductPrice = document.getElementById("modalProductPrice");
    const modalProductQuantity = document.getElementById(
      "modalProductQuantity"
    );
    const modalProductDescription = document.getElementById(
      "modalProductDescription"
    );
    const modalProductCategory = document.getElementById(
      "modalProductCategory"
    );

    if (modalProductName)
      modalProductName.textContent = product.getProductName() || "No Name";
    if (modalProductPrice)
      modalProductPrice.textContent =
        (product.getPrice()?.toFixed(2) || "0.00") + " $";
    if (modalProductQuantity)
      modalProductQuantity.textContent = product.getStock() || "0";
    if (modalProductDescription)
      modalProductDescription.textContent =
        product.getDescription() || "No Description";
    if (modalProductCategory)
      modalProductCategory.textContent =
        product.getCategory() || "Uncategorized";
    mapImagesToCarousel(product.getImages());
    // new bootstrap.Modal(document.getElementById("productModal")).show();
  });
}
function mapImagesToCarousel(images) {
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

  myCarousel.setAttribute("data-bs-interval", "1500");

  images.shift();
  images.forEach((img, index) => {
    const item = document.createElement("div");
    item.className = `carousel-item ${index === 0 ? "active" : ""}`;
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
    indicator.className = index === 0 ? "active" : "";
    indicator.setAttribute("aria-label", `Slide ${index + 1}`);
    carouselIndicators.appendChild(indicator);
  });

  new bootstrap.Carousel(myCarousel);
}
