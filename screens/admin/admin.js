$(".nav-link:lt(5)").click(function (e) {
  e.preventDefault();

  $(".nav-link").removeClass("active");
  $(this).addClass("active");

  $("iframe").removeClass("show");
  let screen = $(this).data("section");
  console.log(screen);
  $("#" + screen).addClass("show");
});
