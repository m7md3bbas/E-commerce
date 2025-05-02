let arr = [ {name:"Golelmo Vicario", email:"gvicario123@gmail.com", phone:"010123456789", address:"123 Main St, City, Country",img:''},
    {name:"son hung men", email:"sonhungm@gmail.com", phone:"01963852741", address:"123 Main St, Tanta, Country"},
    {name:"cute romero", email:"abdo@gmail.com", phone:"01012397654", address:"123 Main St, Danmanhour, Country"},
    {name:"disteny oudegy", email:"yasersteny@gmail.com", phone:"010123456789", address:"123 Main St, City, Country"},
    {name:"pedro porro", email:"pedroporro@gmail.com", phone:"010123456789", address:"123 Main St, City, Country"},
    {name:"van de ven", email:"vandeven@gmail.com", phone:"010123456789", address:"123 Main St, City, Country"},
    {name:"Lucas vergival", email:"lucasvergival@gmail.com", phone:"010123456789", address:"123 Main St, City, Country"},
    {name:"Dominek solanki", email:"dominsola@gmail.com", phone:"010123456789", address:"123 Main St, City, Country"},
]

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
  $("#cards-container").append(`
        <div class="col-6 col-xl-4 d-flex justify-content-center itemCard">
            <div class="card  mt-3" style="width: 100%;">
                <img src="../img/vic.png" class="card-img-top" alt="Customer">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <br>
                    <p class="card-text"><i
                            class="fa-solid fa-envelope me-3"></i>${item.email}</p>
                    <p class="card-text"><i class="fa-solid fa-phone  me-3"></i>${item.phone}</p>
                    <p class="card-text"><i
                            class="fa-solid fa-location-dot  me-3"></i>${item.address}</p>
                </div>
                <div class="card-body d-flex flex-row justify-content-evenly">
                    <button class="btn btn-warning col-5">remove</button>
                    <button class="btn btn-danger col-5">block</button>
                </div>
            </div>
        </div>
        `);
  console.log(index);
});

arr_seller.forEach((item, index) => {
  $("#cards-container-seller").append(`
        <div class="col-6 col-xl-4 d-flex justify-content-center itemCard">
            <div class="card  mt-3" style="width: 100%;">
                <img src="../img/vic.png" class="card-img-top" alt="Customer">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <br>
                    <p class="card-text"><i
                            class="fa-solid fa-envelope me-3"></i>${item.email}</p>
                    <p class="card-text"><i class="fa-solid fa-phone  me-3"></i>${item.phone}</p>
                    <p class="card-text"><i
                            class="fa-solid fa-location-dot  me-3"></i>${item.address}</p>
                </div>
                <div class="card-body d-flex flex-row justify-content-evenly">
                    <button class="btn btn-warning col-5">remove</button>
                    <button class="btn btn-danger col-5">block</button>
                </div>
            </div>
        </div>
        `);
  console.log(index);
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






// $(":text:first").keyup(function () {

//     var userinput = $(this).val();
//     $("tr:gt(0)").each(function () {
//         var tdvalue = $(this).children("td:first").text();
//         if (tdvalue.toLowerCase().indexOf(userinput.toLowerCase()) != -1) {
//             $(this).show(500);
//         } else {
//             $(this).hide(500);
//         }
//     });//end of each for all tr
// });