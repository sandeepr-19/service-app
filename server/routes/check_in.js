const express = require("express");
const router = express.Router();
const bdp = require("body-parser");
const enc = bdp.urlencoded({ extended: true });

const MongoClient = require("mongodb").MongoClient;
const db_url =
  "mongodb+srv://sandeep:1oL%40saN%3A)@cluster0.zycffmo.mongodb.net/?retryWrites=true&w=majority";

router.post("/", enc, (req, res) => {
  let customer_name = req.body.customer_name;
  let customer_no = req.body.mobile_no;
  let product_id = req.body.checkin;

  MongoClient.connect(db_url, async (err, db) => {
    if (err) throw err;
    const dbo = db.db("a1");
    const d = new Date();
    // check-in entry
    const doc = {
      name: customer_name,
      "mobile no": customer_no,
      "product id": product_id,
      "opened date": d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
      time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
    };
    const result = await dbo.collection("check-in").insertOne(doc);
    res.send(
      "successfully stored and the current checkin id is " + result.insertedId
    );
    db.close();
  });
});

router.get("/", (req, res) => {
  MongoClient.connect(db_url, async (err, db) => {
    if (err) throw err;
    let dbo = db.db("a1");

    if (req.query.purpose == "productlist") {
      let list1 = [];
      let cursor = await dbo.collection("products").find({});
      let product = await cursor.toArray();
      product.forEach((element) => {
        list1.push({
          product_id: element["_id"],
          name: element["name"],
          price: element["price"],
          stock: element["stock"],
        });
      });
      res.render("checkin_entry", { list: list1 });
    } else {
      let cursor = await dbo.collection("check-in").find({});
      let values = await cursor.toArray();
      // console.log(values);
      // console.log(values.length);
      let list1 = [];
      values.forEach((element) => {
        list1.push({
          checkin_id: element["_id"],
          name: element["name"],
          mobile_no: element["mobile no"],
        });
      });
      res.send(JSON.stringify(values));
    }
    // values.forEach((element) => {
    //   list1.push({
    //     checkin_id: element["_id"],
    //     name: element["name"],
    //     mobile_no: element["mobile no"],
    //   });
    //});

    db.close();
  });
});

module.exports = router;
