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
    cardValue: "0.000",
    cardIcon: "fa-solid fa-users",
    color: "bg-warning",
  },
  {
    cardName: "Total Products",
    cardValue: "0.000",
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
  labels: ["Female user part", "Male user part"],
  datasets: [
    {
      label: "Client number",
      data: [247, 146],
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      hoverOffset: 5,
    },
  ],
};

new Chart(document.getElementById("pieChart"), {
  type: "pie",
  data: data,
});

const data2 = {
  labels: ["Facebook", "Friend", "instgram", "X", "Telegram"],
  datasets: [
    {
      label: "Client number",
      data: [247, 54, 87, 222, 146],
      backgroundColor: ["blue", "pink", "green", "black", "orange"],
      hoverOffset: 5,
    },
  ],
};

new Chart(document.getElementById("pieChart2"), {
  type: "doughnut",
  data: data2,
});

const data3 = {
  labels: [
    "age: 12-18",
    "age: 19-25",
    "age: 26-35",
    "age: 35-50",
    "age: 50-...",
  ],
  datasets: [
    {
      label: "Customer number",
      data: [11, 16, 14, 7, 3],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(255, 205, 86)",
        "rgb(201, 203, 207)",
        "rgb(54, 162, 235)",
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