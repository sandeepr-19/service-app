const table = document.getElementById("table");
const service_form = document.getElementById("service-form");
const show = document.getElementById("show");
const feed = document.getElementById("feed");
const ser_table = document.getElementById("ser_table");
const form_submit = document.getElementById("form-submit");
const res_message = document.getElementById("res_message");
let a1 = [];
let tser_table = "";

show.addEventListener("click", () => {
  fetch("/service-show")
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      let tser_table = "";
      let service_arr = JSON.parse(text);
      service_arr.forEach((service_obj) => {
        tser_table +=
          "<tr><td>" +
          service_obj["attendee-name"] +
          "</td>" +
          "<td>" +
          service_obj["complaint"] +
          "</td>" +
          "<td>" +
          service_obj["product-details"] +
          "</td>" +
          "</tr>";
        ser_table.innerHTML = tser_table;
      });
    });
  table.style.display = "block";
});

feed.addEventListener("click", () => {
  service_form.style.display = "block";
  res_message.style.display = "none";
});

form_submit.addEventListener("click", () => {
  res_message.style.display = "block";
});
