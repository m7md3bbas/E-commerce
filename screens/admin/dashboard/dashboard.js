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
        <div class="col-12 col-md-6 col-lg-3 mt-2">
                <div class="card dashboard-card ${item.color} text-light border p-3">
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
