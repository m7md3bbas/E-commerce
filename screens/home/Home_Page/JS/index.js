$(document).ready(function () {
  $("#owl-demo").owlCarousel({
    autoPlay: 500, //Set AutoPlay to 3 seconds

    items: 4,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [979, 3],
  });
});

$("#cartHome").click(function () {
  $(this).css("cursor", "pointer");
  console.log("hiii");
  window.location.href = "/screens/home/Cart/cart.html";
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