document.getElementById("checkin_entry").addEventListener("click", () => {
  window.location.href = window.location.href + "check_in?purpose=productlist";
});

document.getElementById("checkin_review").addEventListener("click", () => {
  window.location.href = window.location.href + "check_in";
});

document.getElementById("product_stock_entry").addEventListener("click", () => {
  window.location.href = window.location.href + "product_page";
});

document
  .getElementById("product_stock_review")
  .addEventListener("click", () => {
    window.location.href = window.location.href + "product_review";
  });

document.getElementById("service_entry").addEventListener("click", () => {
  window.location.href = window.location.href + "service_page";
});

document.getElementById("service_review").addEventListener("click", () => {
  window.location.href = window.location.href + "service";
});
