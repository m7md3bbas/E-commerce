import {
  pushPurchase,
  getAllPurchases,
  deletePurchase,
} from "../../../projectModules/purchases.js";

let totalProductNumber = getAllPurchases().length;
let completedProduct = 0;
let cancelledProduct = 0;
let allPurchases = getAllPurchases().reverse();
allPurchases.forEach(function (item, index) {
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
        <td class='fw-bold' style="color:#183B4E">
          <span class="d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-placement="top" data-bs-trigger="hover focus" data-bs-content="${item
            .getBuyer()
            .getName()}">
          ${item.getBuyer().getEmail()}
          </span>
        </td>
        <td style="color:#27548A">${item.getProduct().getProductName()}</td>
        <td>
        <span class="d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-placement="top" data-bs-trigger="hover focus" data-bs-content="${item
          .getProduct()
          .getSeller()}">
          ${item.getProduct().getSellerEmail()}
          </span>
        </td>
        <td style="color:#7F669D">${item.getProduct().getPrice()}$</td>
        <td>${item.getDateOfPurchase()}</td>
        <td style="color:${status_color}">${item.getStatus()}</td>
        <td><button class="btn btn-sm btn-outline-danger deletOrder"  data-id="${item.getId()}"  ><i class="fa fa-trash"></i></button></td>
    </tr>`);
});
$('[data-bs-toggle="popover"]').popover();
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
