import { pushUser, getUsers } from "../../../projectModules/usersModule.js";
import {
  getProducts,
  getProductById,
  getProductsBySellerName,
  getProductsBySellerEmail,
} from "../../../projectModules/productModule.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let products = getProducts();
console.log(getProductById("190"));



let users = getUsers();
let customers = 0;
let male = 0;
let female = 0;

let social_facebook = 0;
let social_x = 0;
let social_instegram = 0;
let social_telegram = 0;
let social_friend = 0;
let socila_other = 0;

let age1 = 0;
let age2 = 0;
let age3 = 0;
let age4 = 0;
let age5 = 0;
let other_age = 0;

users.forEach(function (item) {
  // console.log(item.getGender());

  if (item.getType() === "user") {
    customers++;
    if (item.getGender() === "male") male++;
    else female++;

    let listen = item.getListen();
    if (listen === "Facebook") social_facebook++;
    else if (listen === "X") social_x++;
    else if (listen === "Instagram") social_instegram++;
    else if (listen === "Telegram") social_telegram++;
    else if (listen === "Friend") social_friend++;
    else socila_other++;

    // let age = item.getAge();

    const today = new Date();
    const birthDate = new Date(item.getDateOfBirth());
    let age = today.getFullYear() - birthDate.getFullYear();
    // console.log(age);

    if (age >= 12 && age <= 18) age1++;
    else if (age > 18 && age <= 30) age2++;
    else if (age > 30 && age <= 40) age3++;
    else if (age > 40 && age <= 50) age4++;
    else if (age > 50 && age <= 65) age5++;
    else other_age++;
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// console.log(await getProducts());

let arr = [
  {
    cardName: "Total Orders",
    cardValue: "0.000",
    cardIcon: "fa-solid fa-shopping-cart",
    color: "bg-primary",
  },
  {
    cardName: "Total Revenue",
    cardValue: "0.000",
    cardIcon: "fa-solid fa-dollar-sign",
    color: "bg-success",
  },
  {
    cardName: "Total Customers",
    cardValue: `${customers}`,
    cardIcon: "fa-solid fa-users",
    color: "bg-warning",
  },
  {
    cardName: "Total Products",
    cardValue: `${products.length}`,
    cardIcon: "fa-solid fa-box",
    color: "bg-info",
  },
];


arr.forEach((item) => {
  console.log(item.cardName);
  $("#cards-container").append(`
        <div class="col-12 col-md-6 col-lg-3 mt-2 ">
                <div class="card dashboard-card ${item.color}-subtle text-primary border p-3 shadow">
                    <div class="d-flex flex-row justify-content-between">
                        <div>
                            <p class="h6">${item.cardName}</p>
                            <p class="h1">${item.cardValue}</p>
                        </div>
                        <i class="${item.cardIcon} fa-2x mt-3"></i>
                    </div>
                    <div class="mt-2">
                        <span><i class="fas fa-arrow-up"></i> 0.0% since last month</span>
                    </div>
                </div>
            </div>
        `);
});

const data = {
  labels: ["Female", "Male"],
  datasets: [
    {
      label: "Client number",
      data: [female, male],
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      hoverOffset: 5,
    },
  ],
};

new Chart(document.getElementById("pieChart"), {
  type: "pie",
  data: data,
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const data2 = {
  labels: ["Facebook", "Friend", "insta", "X", "Telegram", "other"],
  datasets: [
    {
      label: "Client number",
      data: [
        social_facebook,
        social_friend,
        social_instegram,
        social_x,
        social_telegram,
        socila_other,
      ],
      backgroundColor: ["blue", "pink", "green", "black", "orange", "purple"],
      hoverOffset: 6,
    },
  ],
};

new Chart(document.getElementById("pieChart2"), {
  type: "doughnut",
  data: data2,
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const data3 = {
  labels: [
    "age: 12-18",
    "age: 19-30",
    "age: 31-40",
    "age: 41-50",
    "age: 51-65",
    "other",
  ],
  datasets: [
    {
      label: "Customer number",
      data: [age1, age2, age3, age4, age5, other_age],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(255, 205, 86)",
        "rgb(201, 203, 207)",
        "rgb(54, 162, 235)",
        "rgb(231, 151, 244)",
      ],
    },
  ],
};

new Chart(document.getElementById("pieChart3"), {
  type: "polarArea",
  data: data3,
  options: {},
});

//////////////////////////////////////////////////////////////////////////////////////////////////////

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data4 = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};

new Chart(document.getElementById("pieChart4"), {
  type: "bar",
  data: data4,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Region Chart
const regionCtx = document.getElementById("pieChart5");
const regionChart = new Chart(regionCtx, {
  type: "bar",
  data: {
    labels: ["Garbia", "Behera", "Cairo", "Monofia", "Sharqia", "Kfr Elshekh"],
    datasets: [
      {
        label: "Sales ($)",
        data: [60, 50, 20, 40, 70, 90],
        backgroundColor: [
          "rgba(78, 115, 223, 0.8)",
          "rgba(28, 200, 138, 0.8)",
          "rgba(54, 185, 204, 0.8)",
          "rgba(246, 194, 62, 0.8)",
          "rgba(231, 74, 59, 0.8)",
          "rgba(133, 135, 150, 0.8)",
        ],
      },
    ],
  },
});
