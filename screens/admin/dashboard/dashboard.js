import { getUsers } from "../../../projectModules/usersModule.js";
import {
  getProducts,
  getProductById,
} from "../../../projectModules/productModule.js";
import { getAllPurchases } from "../../../projectModules/purchases.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getLast7Months = () => {
  const months = [];
  const now = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleString("default", { month: "long" });
    months.push(monthName);
  }

  return months.reverse();
};
let months = getLast7Months();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let products = getProducts();
let allPurchases = getAllPurchases();
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

let totalRevenue = 0;

users.forEach(function (item) {
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

    const today = new Date();
    const birthDate = new Date(item.getDateOfBirth());
    let age = today.getFullYear() - birthDate.getFullYear();

    if (age >= 12 && age <= 18) age1++;
    else if (age > 18 && age <= 30) age2++;
    else if (age > 30 && age <= 40) age3++;
    else if (age > 40 && age <= 50) age4++;
    else if (age > 50 && age <= 65) age5++;
    else other_age++;
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let garbia = 0;
let behera = 0;
let monofia = 0;
let sharpia = 0;
let kfrElshekh = 0;
let other_govern = 0;

let monthRevenue = [0, 0, 0, 0, 0, 0, 0];
let monthOrders = [0, 0, 0, 0, 0, 0, 0];

allPurchases.forEach(function (item) {
  if (item.getStatus().toLowerCase() == "cancelled") return;
  const date = new Date(item.getDateOfPurchase());
  const monthName = date.toLocaleString("default", { month: "long" });

  totalRevenue += parseInt(item.getProduct().getPrice());
  let address = item.getBuyer().getAddress().toLowerCase();

  if (address === "garbia") garbia++;
  else if (address === "behera") behera++;
  else if (address === "monofia") monofia++;
  else if (address === "sharqia") sharpia++;
  else if (address === "kfr elshekh") kfrElshekh++;
  else other_govern++;

  let price = parseInt(item.getProduct().getPrice());
  if (monthName === months[0]) {
    monthOrders[0]++;
    monthRevenue[0] += price;
  } else if (monthName === months[1]) {
    monthOrders[1]++;
    monthRevenue[1] += price;
  } else if (monthName === months[2]) {
    monthOrders[2]++;
    monthRevenue[2] += price;
  } else if (monthName === months[3]) {
    monthOrders[3]++;
    monthRevenue[3] += price;
  } else if (monthName === months[4]) {
    monthOrders[4]++;
    monthRevenue[4] += price;
  } else if (monthName === months[5]) {
    monthOrders[5]++;
    monthRevenue[5] += price;
  } else if (monthName === months[6]) {
    monthOrders[6]++;
    monthRevenue[6] += price;
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let arr = [
  {
    cardName: "Total Orders",
    cardValue: `${allPurchases.length}`,
    cardIcon: "fa-solid fa-shopping-cart",
    color: "primary",
  },
  {
    cardName: "Total Revenue",
    cardValue: `${totalRevenue}`,
    cardIcon: "fa-solid fa-dollar-sign",
    color: "success",
  },
  {
    cardName: "Total Customers",
    cardValue: `${customers}`,
    cardIcon: "fa-solid fa-users",
    color: "warning",
  },
  {
    cardName: "Total Products",
    cardValue: `${products.length}`,
    cardIcon: "fa-solid fa-box",
    color: "info",
  },
];

arr.forEach((item) => {
  $("#cards-container").append(`
        <div class="col-12 col-md-6 col-lg-3 mt-2">
                <div class="card dashboard-card  border p-4 shadow  text-${item.color}" style="color:#715831">
                    <div class="d-flex flex-row justify-content-between">
                        <div>
                            <p class="h6">${item.cardName}</p>
                            <p class="h1">${item.cardValue}</p>
                        </div>
                        <i class="${item.cardIcon} fa-2x mt-3"></i>
                    </div>
                    <div class="mt-2">
                        <span>Since launching the website</span>
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
      backgroundColor: [
        "rgb(54, 162, 235)",
        "rgb(255, 159, 64)",
        "rgb(75, 192, 192)",
        "rgb(255, 99, 132)",
        "rgb(255, 205, 86)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
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

const labels = months;
const data4 = {
  labels: labels,
  datasets: [
    {
      label: "Order",
      data: monthOrders,
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
    labels: ["Garbia", "Behera", "Monofia", "Sharqia", "Kfr Elshekh", "Other"],
    datasets: [
      {
        label: "Purchase operation",
        data: [garbia, behera, monofia, sharpia, kfrElshekh, other_govern],
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
/////////////////////////////////////////////////////////////////////////

const labels7 = months;
const data7 = {
  labels: labels,
  datasets: [
    {
      label: "Revenue in $",
      data: monthRevenue,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

new Chart(document.getElementById("pieChart7"), {
  type: "line",
  data: data7,
});
