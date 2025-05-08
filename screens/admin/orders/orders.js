import {
  pushPurchase,
  getAllPurchases,
  deletePurchase,
} from "../../../projectModules/purchases.js";
import {
  getProducts,
  getProductById,
} from "../../../projectModules/productModule.js";
import {
  getUsers,
  getUserByID,
  deleteLastUser,
  getUserByEmail,
} from "../../../projectModules/usersModule.js";

// pushPurchase("123", "pending", getUsers()[1], getProducts()[5]);
// pushPurchase("124", "completed", getUsers()[2], getProducts()[6]);
// pushPurchase("125", "completed", getUsers()[3], getProducts()[7]);
// pushPurchase("126", "cancelled", getUsers()[4], getProducts()[22]);
// pushPurchase("127", "cancelled", getUsers()[5], getProducts()[4]);
let totalProductNumber = getAllPurchases().length;
let completedProduct = 0;
let cancelledProduct = 0;
getAllPurchases().forEach(function (item, index) {
  let status_color = "orange";
  let PurchasNumber = index + 1;
  if (item.getStatus() === "completed") {
    completedProduct++;
    status_color = "green";
  }
  if (item.getStatus() === "cancelled") {
    cancelledProduct++;
    status_color = "red";
  }

  $("tbody").append(`
    <tr class="orderRaw" data-status="${item.getStatus()}">
        <th scope="row">${PurchasNumber}</th>
        <td>${item.getId()}</td>
        <td class='fw-bold' style="color:#183B4E">${item
          .getBuyer()
          .getName()}</td>
        <td style="color:#27548A">${item.getProduct().getProductName()}</td>
        <td>${item.getProduct().getSeller()}</td>
        <td style="color:#7F669D">${item.getProduct().getPrice()}$</td>
        <td>${item.getDateOfPurchase()}</td>
        <td style="color:${status_color}">${item.getStatus()}</td>
        <td><button class="btn btn-sm btn-outline-danger deletOrder"  data-id="${item.getId()}"  ><i class="fa fa-trash"></i></button></td>
    </tr>`);
});
$("#totalOrder_number").text(totalProductNumber);
$("#completeOrder-number").text(completedProduct);
$("#cancelledOrder-number").text(cancelledProduct);

// Search for any thing
$("#orderSearchInp").on("keyup", function () {
  let value = $(this).val().toLowerCase();
  $(".orderRaw ").each(function (val) {
    if ($(this).text().toLowerCase().indexOf(value) != -1) {
      $(this).removeClass("d-none");
    } else {
      $(this).addClass("d-none");
    }
  });
});

// Select for Status

$(".form-select").on("change", function (e) {
  let value = e.target.value.toLowerCase();
  console.log(value);

  $(".orderRaw").each(function () {
    console.log($(this).data("status"));
    if ($(this).data("status") === value || e.target.value === "status") {
      $(this).removeClass("d-none2");
    } else {
      $(this).addClass("d-none2");
    }
  });
});

/// delete order

$(document).on("click", ".deletOrder", function () {
  let result = confirm("Are you sure?");

  if (result) {
    let orderId = $(this).data("id");
    deletePurchase(orderId);
    alert("User deleted successfully");
    location.reload();
  }
});
