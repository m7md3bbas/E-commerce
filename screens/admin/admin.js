$(".nav-link:lt(5)").click(function (e) {
  e.preventDefault();

  $(".nav-link").removeClass("active");
  $(this).addClass("active");

  $("iframe").removeClass("show");
  let screen = $(this).data("section");
  console.log(screen);
  $("#" + screen).addClass("show");
});

$("#GoHome").click(function () {
  location.assign("../home/Home_Page/index.html");
});

$("#SignOut").on("click", logout);
function logout() {
  localStorage.removeItem("current_user");
  window.location.replace("../auth/login.html");
}
