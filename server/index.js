const express = require("express");
const PORT = process.env.PORT || 3002;
const app = express();
const path = require("path");
const bdp = require("body-parser");
const enc = bdp.urlencoded({ extended: true });
const MongoClient = require("mongodb").MongoClient;
const db_url =
  "mongodb+srv://sandeep:1oL%40saN%3A)@cluster0.zycffmo.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static("../public"));

/* home request*/
app.get("/", (req, res) => {
  res.sendFile(__dirname + "../public/index.html");
});

/*app.get("/parts_data", (req, res) => {
  MongoClient.connect(db_url, function (err, db) {
    if (err) throw err;
    const dbo = db.db("a1");

    dbo
      .collection("parts")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));

        db.close();
      });
  });
});*/

/* service display request */

app.get("/service-show", (req, res) => {
  MongoClient.connect(db_url, async function (err, db) {
    if (err) throw err;
    const dbo = db.db("a1");
    let cursor = await dbo.collection("service").find({});

    const allValues = await cursor.toArray();

    res.send(JSON.stringify(allValues));
    db.close();
  });
});

/*service entry request*/

app.post("/service-det", enc, (req, res) => {
  let attendee_n = req.body.attendee_name;
  let complaint = req.body.complaint;
  let product_det = req.body.product_det;
  let rep_item_id = req.body.rep_item_id;
  let acc_date = req.body.acc_date;
  let fin_date = req.body.fin_date;

  MongoClient.connect(db_url, async (err, db) => {
    if (err) throw err;
    const dbo = db.db("a1");

    const doc = {
      "attendee-name": attendee_n,
      complaint: complaint,
      "product-details": product_det,
      "rep-item-id": rep_item_id,
      "accepted-date": acc_date,
      "finished-date": fin_date,
    };
    const result = await dbo.collection("service").insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    db.close();
  });
  res.send("data successfully stored");
});

// checkin entry request
app.post("/check-det", enc, (req, res) => {
  let customer_name = req.body.customer_name;
  let customer_no = req.body.mobile_no;

  MongoClient.connect(db_url, async (err, db) => {
    if (err) throw err;
    const dbo = db.db("a1");
    // customer entry
    const doc = { name: customer_name, "mobile no": customer_no };
    const result = await dbo.collection("customers").insertOne(doc);

    //checkin entry
    const d = new Date();
    const doc1 = {
      "customer-id": result.insertedId,
      "opened-date": d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
    };
    const result1 = await dbo.collection("check-in").insertOne(doc1);

    db.close();
  });
  res.send("successfully stored");
});

//check-in display request
app.get("/displayTable", (req, res) => {
  MongoClient.connect(db_url, async (err, db) => {
    if (err) throw err;
    let dbo = db.db("a1");
    let cursor = await dbo.collection("check-in").find({});
    let values = await cursor.toArray();
    res.send(JSON.stringify(values));
    db.close();
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
