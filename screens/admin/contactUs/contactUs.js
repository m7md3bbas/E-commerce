import {
  getAllMessages,
  deleteMessage,
} from "../../../projectModules/contactus.js";

let messages = getAllMessages();

messages.forEach((item, index) => {
  let messDate = new Date(item.date);
  $("#message_section").append(`
    <div class ="m-2 messages">
        <div class="card col-12 d-flex flex-row p-2 text-center align-items-center message1"
            style="border: 1px solid #bd924c; border-radius: 6px">
            <p class="col-1 mt-3">
                <input class="form-check-input message-checkbox check-message"  type="checkbox"/>
            </p>
            <p class="card-text mt-3 fw-bold col col-lg-2">${item.name}</p>
            <p class="card-text mt-3 col-lg-4 d-none d-lg-block">${item.message.substring(
              0,
              30
            )}....</p>
            <p class="card-text mt-3 fw-bold col-2 d-none d-md-block">${
              item.phone
            }</p>
            <div class="col-2 d-none d-lg-block">${messDate.toLocaleString()}</div>
            <div class="col col-lg-1">
            <button
                class="btn btn-sm btn-outline-warning me-1"
                data-bs-toggle="collapse"
                data-bs-target="#collapes-${index}"
                aria-expanded="false"
                aria-controls="collapes-${index}">
                <i class="fa-solid fa-eye"></i>
            </button>
            <button  data-id=${
              item.id
            } class="btn btn-sm btn-outline-warning del-icon">
                <i class="fa fa-trash"></i>
            </button>
            </div>
        </div>
    </div>

        <div class="collapse m-2" id="collapes-${index}">
            <div class="card card-body">${item.message}</div>
        </div>
    `);
});

$(".del-icon").click(function () {
  let result = confirm("Are you sure?");

  if (result) {
    let mess = $(this).data("id");
    deleteMessage(mess);
    alert("Message deleted successfully");
    location.reload();
  }
});

$("#searchItem").on("keyup", function () {
  let value = $(this).val().toLowerCase();
  $(".messages").each(function (val) {
    if ($(this).text().toLowerCase().indexOf(value) != -1) {
      $(this).removeClass("d-none");
    } else {
      $(this).addClass("d-none");
    }
  });
});
