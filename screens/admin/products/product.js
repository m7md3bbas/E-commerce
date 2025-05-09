console.log("product.js");

import {
  pushProduct,
  getProducts,
  getProductById,
  getProductsBySellerName,
  getProductsBySellerEmail,
  deleteProduct,
  updateProduct,
} from "../../../projectModules/productModule.js";
import { showItem } from "./productFun.js";

let products = getProducts();
let nonactive = 0;

products.forEach(function (item, index) {
  // console.log("apend run");
  if (item.getStock() === 0) nonactive++;

  let itemNumber = index + 1;

  $("tbody").append(`
      <tr class="productRow" data-category='${item.getCategory()}'>
            <th scope="row">${itemNumber}</th>
            <td class='idTD'>${item.getId()}</td>
            <td class="h6">${item.getProductName()}</td>
            <td>${item.getSeller()}</td>
            <td class="text-danger">${item.getPrice()}$</td>
            <td class="text-success stockTd">${item.getStock()}</td>
            <td class="">${item.getCreatedTime().substring(0, 19)}</td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-outline-primary me-1 showBtn" data-id="${item.getId()}" data-bs-toggle="modal" data-bs-target="#productModal">
                    <i class="fa-solid fa-eye"></i></button>
                <button class="btn btn-sm btn-outline-danger deletePro"  data-id="${item.getId()}"  ><i class="fa fa-trash"></i></button>
            </td>
        </tr>
      `);
});

document.getElementById("TPh1").innerText = products.length;
document.getElementById("APh1").innerText = products.length - nonactive;
document.getElementById("OOSh1").innerText = nonactive;

$("#ProductSearch").on("keyup", function () {
  // $("#ProductStockInp").val("");
  let value = $(this).val().toLowerCase();
  $(".productRow ").each(function (val) {
    if ($(this).text().toLowerCase().indexOf(value) != -1) {
      $(this).removeClass("d-none");
    } else {
      $(this).addClass("d-none");
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#ProductStockInp").on("keyup", function () {
  // $("#ProductSearch").val("");
  let value = $(this).val().toLowerCase();
  $(".productRow ").each(function (val) {
    if (
      parseInt($(this).find(".stockTd").text()) <= parseInt(value) ||
      value === ""
    ) {
      $(this).removeClass("d-none2");
    } else {
      $(this).addClass("d-none2");
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".form-select").on("change", function (e) {
  // $("#ProductSearch").val("");
  console.log(e.target.value);

  let value = e.target.value.toLowerCase();
  $(".productRow ").each(function (val) {
    if (
      $(this).data("category") === value ||
      e.target.value === "Select Category"
    ) {
      $(this).removeClass("d-none3");
    } else {
      $(this).addClass("d-none3");
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

showItem();

$(document).on("click", ".deletePro", function () {
  let result = confirm("Are you sure?");

  if (result) {
    let productId = $(this).data("id");
    // console.log(userId);
    deleteProduct(productId);
    alert("User deleted successfully");
    location.reload();
  }
});
