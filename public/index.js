//let butto = document.getElementById("butto");
let par = document.getElementById("par");
let bt_ser = document.getElementById("bt-ser");
let bt_sal = document.getElementById("bt-sal");
let bt_check_display = document.getElementById("bt-check-display");
let bt_check_details = document.getElementById("bt-check-details");
let check_form = document.getElementById("check-form");
let check_table = document.getElementById("check_table");
//service page
bt_ser.addEventListener("click", () => {
  window.location.href = "./service.html";
});

//sales page

bt_sal.addEventListener("click", () => {
  window.location.href = "./sales.html";
});

//check-in details

bt_check_details.addEventListener("click", () => {
  check_form.style.display = "block";
});

bt_check_display.addEventListener("click", () => {
  fetch("/check_in")
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      console.log(JSON.parse(text));
    });
  check_table.style.display = "block";
});

/* const xhttp = new XMLHttpRequest();

xhttp.onload = function(response) {
  if (response.status == 200) {
    console.log("ok");
  } else {
    console.log(response.statusText);
  }
}

xhttp.open("GET", "/toservice");
xhttp.send();

fetch("/toservice").then((res) => {
    if (res.status == 200) {
      console.log("ok");
    } else {
      console.log(res.statusText);
    }
  });
*/

/*   .catch(() => console.log("no reponse"))
    .then((res) => console.log(res.json()))
    .then((par.innerHTML = "hi"))
    .then((data) => {
      console.log(data);
    });
}); 
*/
/*butto.addEventListener("click", () => {
  fetch("/parts_data")
    .then((response) => {
      if (response.status == 200) {
        console.log("ok");
        return response.text();
      } else {
        console.log(response.statusText);
      }
    })
    .then((text) => (par.innerHTML += text));
});*/
