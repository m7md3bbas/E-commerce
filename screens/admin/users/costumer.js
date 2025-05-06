import {
  pushUser,
  getUsers,
  deleteUser,
  deleteLastUser,
} from "../../../projectModules/usersModule.js";

let arr = getUsers();

let arr_seller = [
  {
    name: "Golelmo El seller",
    email: "gvicario123@gmail.com",
    phone: "010123456789",
    address: "123 Main St, City, Country",
    img: "",
  },
  {
    name: "son Elseller",
    email: "sonhungm@gmail.com",
    phone: "01963852741",
    address: "123 Main St, Tanta, Country",
  },
  {
    name: "cute Elseller",
    email: "abdo@gmail.com",
    phone: "01012397654",
    address: "123 Main St, Danmanhour, Country",
  },
];

arr.forEach((item, index) => {
  if (item.getType() === "user") {
    $("#cards-container").append(`
        <div class="col-12 col-sm-6 col-xl-3 d-flex justify-content-center itemCard">
  <div class="card shadow mt-4" style="width: 100%; border-radius: 1rem; overflow: hidden;">
    
    <!-- Image Section -->
    <img src="../../../assets/imgs/admin/img/default.png" class="card-img-top" alt="Customer" style="height: 200px; object-fit: cover;">

    <!-- Info Section -->
    <div class="card-body">
      <h5 class="card-title fw-bold mb-3">${item.getName()}</h5>
      <p class="card-text mb-2">
        <i class="fa-solid fa-envelope me-2 text-primary"></i>${item.getEmail()}
      </p>
      <p class="card-text mb-2">
        <i class="fa-solid fa-phone me-2 text-success"></i>${item.getPhone()}
      </p>
      <p class="card-text mb-3">
        <i class="fa-solid fa-location-dot me-2 text-danger"></i>${item.getAddress()}
      </p>
    </div>

    <!-- Action Button Section -->
    <div class="card-footer bg-white border-top-0 d-flex justify-content-center pb-3">
      <button data-id="${item.getId()}" class="btn btn-outline-danger w-75 remove-btn">
        <i class="fa-solid fa-trash me-2"></i>Remove
      </button>
    </div>
    
  </div>
</div>

        `);
    // console.log(index);
  }
});

arr.forEach((item, index) => {
  if (item.getType() === "seller" && index > 0) {
    $("#cards-container-seller").append(`
       <div class="col-12 col-sm-6 col-xl-3 d-flex justify-content-center itemCard">
  <div class="card shadow mt-4" style="width: 100%; border-radius: 1rem; overflow: hidden;">
    
    <!-- Image Section -->
    <img src="../../../assets/imgs/admin/img/default.png" class="card-img-top" alt="Customer" style="height: 200px; object-fit: cover;">

    <!-- Info Section -->
    <div class="card-body">
      <h5 class="card-title fw-bold mb-3">${item.getName()}</h5>
      <p class="card-text mb-2">
        <i class="fa-solid fa-envelope me-2 text-primary"></i>${item.getEmail()}
      </p>
      <p class="card-text mb-2">
        <i class="fa-solid fa-phone me-2 text-success"></i>${item.getPhone()}
      </p>
      <p class="card-text mb-3">
        <i class="fa-solid fa-location-dot me-2 text-danger"></i>${item.getAddress()}
      </p>
    </div>

    <!-- Action Button Section -->
    <div class="card-footer bg-white border-top-0 d-flex justify-content-center pb-3">
      <button data-id="${item.getId()}" class="btn btn-outline-danger w-75 remove-btn">
        <i class="fa-solid fa-trash me-2"></i>Remove
      </button>
    </div>
    
  </div>
</div>
        `);
    console.log(index);
  }
});

$("#searchItem").on("keyup", function () {
  let value = $(this).val().toLowerCase();
  $(".itemCard").each(function (val) {
    if ($(this).text().toLowerCase().indexOf(value) != -1) {
      $(this).removeClass("d-none");
    } else {
      $(this).addClass("d-none");
    }
  });
});

$("#searchItem-seller").on("keyup", function () {
  let value = $(this).val().toLowerCase();
  $(".itemCard").each(function (val) {
    if ($(this).text().toLowerCase().indexOf(value) != -1) {
      $(this).removeClass("d-none");
    } else {
      $(this).addClass("d-none");
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!this.checkValidity()) {
    this.reportValidity();
    return;
  }

  let newId =
    getUsers().length > 0 ? getUsers()[getUsers().length - 1].getId() + 1 : 1;

  let name = $("#User-name").val();
  let email = $("#user-email").val();
  let passowrd = $("#user-password").val();
  let address = $("#user-address").val();
  let gender = $("#user-gender").val();
  let birth = $("#user-birth").val();
  let phone = $("#user-phone").val();

  pushUser(
    newId,
    name,
    email,
    passowrd,
    0,
    address,
    gender,
    birth,
    "Friend",
    phone,
    "../../../assets/imgs/admin/img/default.png",
    "user"
  );

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("userModal")
  );
  modal.hide();
  this.reset();
  location.reload();
});

/////remove - customer//////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", ".remove-btn", function () {
  let result = confirm("Are you sure?");

  if (result) {
    let userId = $(this).data("id");
    // console.log(userId);
    deleteUser(userId);
    alert("User deleted successfully");
    location.reload();
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("sellerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let newId =
    getUsers().length > 0 ? getUsers()[getUsers().length - 1].getId() + 1 : 1;

  if (!this.checkValidity()) {
    this.reportValidity();
    return;
  }

  const sellerData = {
    name: $("#seller-name").val(),
    email: $("#seller-email").val(),
    password: $("#seller-password").val(),
    phone: $("#seller-Phone").val(),
    address: $("#seller-address").val(),
    gender: $("#seller-gender").val(),
  };

  pushUser(
    newId,
    sellerData.name,
    sellerData.email,
    sellerData.password,
    0,
    sellerData.address,
    sellerData.gender,
    null,
    null,
    sellerData.phone,
    "../../../assets/imgs/admin/img/default.png",
    "seller"
  );

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("sellerModal")
  );
  modal.hide();
  this.reset();
  location.reload();
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
