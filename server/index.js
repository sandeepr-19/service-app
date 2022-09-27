const express = require("express");
const PORT = process.env.PORT || 3002;
const app = express();

const service = require("./routes/service.js");
const sales = require("./routes/sales.js");
const check_in = require("./routes/check_in.js");

app.use(express.static("../public"));

/* home request*/
app.get("/", (req, res) => {
  res.sendFile(__dirname + "../public/index.html");
});

app.use("/sales", sales);
app.use("/service", service);
app.use("/check_in", check_in);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
