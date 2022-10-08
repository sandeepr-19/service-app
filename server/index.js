const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const pug = require("pug");
const path = require("path");

const service = require("./routes/service.js");
const product = require("./routes/product.js");
const check_in = require("./routes/check_in.js");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static("../public"));

/* home request*/
app.get("/", (req, res) => {
  res.render("home.pug");
});

//redirect
//service entry
app.get("/service_page", (req, res) => {
  res.render("service_entry");
});

//product stock entry
app.get("/product_page", (req, res) => {
  res.render("product_entry");
});

app.use("/product", product);
app.use("/service", service);
app.use("/check_in", check_in);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
