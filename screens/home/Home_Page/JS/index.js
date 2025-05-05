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
