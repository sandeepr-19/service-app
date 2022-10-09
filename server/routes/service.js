const express = require("express");
const router = express.Router();
const bdp = require("body-parser");
const enc = bdp.urlencoded({ extended: true });

const MongoClient = require("mongodb").MongoClient;
const db_url =
  "mongodb+srv://sandeep:1oL%40saN%3A)@cluster0.zycffmo.mongodb.net/?retryWrites=true&w=majority";

router.get("/", (req, res) => {
  MongoClient.connect(db_url, async (err, db) => {
    if (err) throw err;
    const dbo = db.db("a1");
    if (req.query.purpose == "checkin_list") {
      let cursor1 = await dbo.collection("check-in").find({});
      let values1 = await cursor1.toArray();
      let checkins = [];
      values1.forEach((element) => {
        checkins.push({
          checkin_id: element["_id"],
          name: element["name"],
          mobile_no: element["mobile no"],
        });
      });

      let cursor2 = await dbo.collection("products").find({});
      let products = await cursor2.toArray();
      res.render("service_entry", { checkins: checkins, products: products });
    } else {
      let cursor = await dbo.collection("service").find({});
      const allValues = await cursor.toArray();
      res.render("service_review", {
        total: allValues.length,
        obj: allValues,
      });
    }

    db.close();
  });
});

router.post("/", enc, (req, res) => {
  let checkin_id = req.body.checkind;
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
    const result1 = await dbo
      .collection("check-in")
      .findOneAndUpdate({ _id: checkin_id }, { $set: { service_id: result } });
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    console.log(result1.insertedId);
    db.close();
  });
  res.send("data successfully stored");
});

module.exports = router;
