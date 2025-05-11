import { getProducts } from "../../../projectModules/productModule.js";
import {
  pushUser,
  getUsers,
  deleteUser,
  getUserByID,
  deleteLastUser,
  getUserByEmail,
  updateUser,
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
        <div class="col-12 col-sm-6 col-xl-4 d-flex justify-content-center itemCard">
  <div class="card shadow mt-4" style="width: 100%; border-radius: 1rem; overflow: hidden;">
    
    <!-- Image Section -->

    <!-- Info Section -->
    <div class="card-body">
      <h5 class="card-title fw-bold mb-3">${
        item.getName() || "Not entered"
      }</h5>
      <p class="card-text mb-2">
        <i class="fa-solid fa-envelope me-2 text-primary"></i>${
          item.getEmail() || "Not entered"
        }
      </p>
      <p class="card-text mb-2">
        <i class="fa-solid fa-phone me-2 text-success"></i>${
          item.getPhone() || "Not entered"
        }
      </p>
      <p class="card-text mb-3">
        <i class="fa-solid fa-location-dot me-2 text-danger"></i>${
          item.getAddress() || "Not entered"
        }
      </p>
    </div>

    <!-- Action Button Section -->
    <div class="card-footer bg-white border-top-0 d-flex justify-content-evenly pb-3">
    
    <button data-id="${item.getId()}" class="btn btn-outline-warning col-5 edit-btn-user" data-bs-toggle="modal" data-bs-target="#userModal">
        <i class="fa-solid fa-pen me-2"></i>Edit
      </button>

      <button data-id="${
        item.getId() || "Not entered"
      }" class="btn btn-outline-danger col-5 remove-btn">
        <i class="fa-solid fa-trash me-2"></i>Remove
      </button>
    </div>
    
  </div>
</div>

        `);
    // console.log(index);
  }
});

//    <img src="../../../assets/imgs/admin/img/default.png" class="card-img-top" alt="Customer" style="height: 200px; object-fit: cover;">

arr.forEach((item, index) => {
  if (item.getType() === "seller" && index > 0) {
    $("#cards-container-seller").append(`
       <div class="col-12 col-sm-6 col-xl-4 d-flex justify-content-center itemCard">
  <div class="card shadow mt-4" style="width: 100%; border-radius: 1rem; overflow: hidden;">
    

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
    <div class="card-footer bg-white border-top-0 d-flex justify-content-evenly pb-3">

    <button data-id="${item.getId()}" class="btn btn-outline-warning col-5 edit-btn-seller" data-bs-toggle="modal" data-bs-target="#sellerModal">
        <i class="fa-solid fa-pen me-2"></i>Edit
      </button>

      <button data-id="${item.getId()}" class="btn btn-outline-danger col-5 remove-btn">
        <i class="fa-solid fa-trash me-2"></i>Remove
      </button>
    </div>
    
  </div>
</div>
        `);
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
  try {
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
    setTimeout(function () {
      location.reload();
    }, 1500);
    alertSuccess();
  } catch (e) {
    alert(e);
  }
});

/////remove - customer//////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", ".remove-btn", function () {
  checkDelete().then((confirmed) => {
    if (confirmed) {
      console.log(confirmed);
      let userId = $(this).data("id");
      // console.log(userId);
      deleteUser(userId);
    }
  });
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

  console.log("add userwwwwwwwwwwwwwww");
  try {
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
    setTimeout(function () {
      location.reload();
    }, 1500);
    alertSuccess();
  } catch (e) {
    alert(e);
  }
});

///////update seller////////////////////////////////////////////////////////////////////////////////////////////////////////////

let sellerId = 0;
$(".edit-btn-seller").click(function () {
  $("#saveChangebtn").addClass("d-none");
  $("#updateChangebtn").removeClass("d-none");

  sellerId = $(this).data("id");
  let seller = getUserByID(sellerId);

  $("#seller-name").val(seller.getName()),
    $("#seller-email").val(seller.getEmail()),
    $("#seller-password").val(seller.getPassword()),
    $("#seller-Phone").val(seller.getPhone()),
    $("#seller-address").val(seller.getAddress()),
    $("#seller-gender").val(seller.getGender());
});

$("#updateChangebtn").click(function (e) {
  e.preventDefault;
  // console.log("update btn");
  const sellerData = {
    name: $("#seller-name").val(),
    email: $("#seller-email").val(),
    password: $("#seller-password").val(),
    phone: $("#seller-Phone").val(),
    address: $("#seller-address").val(),
    gender: $("#seller-gender").val(),
  };

  console.log(sellerData.email);
  try {
    updateUser(
      sellerId,
      sellerData.email,
      sellerData.name,
      sellerData.password,
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
    // this.reset();
    setTimeout(function () {
      location.reload();
    }, 1500);
    alertSuccess();
  } catch (e) {
    alert(e);
  }
});

///////update user////////////////////////////////////////////////////////////////////////////////////////////////////////////
let userId = 0;
$(".edit-btn-user").click(function () {
  $("#Add-user-btn").addClass("d-none");
  $("#update-user-btn").removeClass("d-none");

  userId = $(this).data("id");
  let user = getUserByID(userId);

  $("#User-name").val(user.getName()),
    $("#user-email").val(user.getEmail()),
    $("#user-password").val(user.getPassword()),
    $("#user-phone").val(user.getPhone()),
    $("#user-address").val(user.getAddress()),
    $("#user-gender").val(user.getGender());
});

$("#update-user-btn").click(function (e) {
  e.preventDefault;
  // console.log("update btn");
  const userData = {
    name: $("#User-name").val(),
    email: $("#user-email").val(),
    password: $("#user-password").val(),
    phone: $("#user-phone").val(),
    address: $("#user-address").val(),
    gender: $("#user-gender").val(),
  };

  console.log(userData.email);
  try {
    updateUser(
      userId,
      userData.email,
      userData.name,
      userData.password,
      userData.address,
      userData.gender,
      null,
      null,
      userData.phone,
      "../../../assets/imgs/admin/img/default.png",
      "user"
    );

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("userModal")
    );

    modal.hide();
    setTimeout(function () {
      location.reload();
    }, 1500);
    alertSuccess();
  } catch (e) {
    alert(e);
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////
$("#mainAdduserbtn").click(function () {
  {
    $("#User-name").val(""),
      $("#user-email").val(""),
      $("#user-password").val(""),
      $("#user-phone").val(""),
      $("#user-address").val(""),
      $("#user-gender").val("");
    $("#Add-user-btn").removeClass("d-none");
    $("#update-user-btn").addClass("d-none");
  }
});

$("#mainAddsellerbtn").click(function () {
  {
    $("#seller-name").val(""),
      $("#seller-email").val(""),
      $("#seller-password").val(""),
      $("#seller-Phone").val(""),
      $("#seller-address").val(""),
      $("#seller-gender").val("");
    $("#saveChangebtn").removeClass("d-none");
    $("#updateChangebtn").addClass("d-none");
  }
});

/////////////////////////////////////////////////////////////

function alertSuccess() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
}

function checkDelete() {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      }).then(() => {
        location.reload();
      });
      // console.log("response");
      return true;
    } else {
      return false;
    }
  });
}
