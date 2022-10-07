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
    res.send(
      "successfully stored and the current checkin id is " + result1.insertedId
    );
    db.close();
  });
});

router.get("/", (req, res) => {
  MongoClient.connect(db_url, async (err, db) => {
    if (err) throw err;
    let dbo = db.db("a1");
    let cursor = await dbo.collection("check-in").find({});
    let values = await cursor.toArray();
    console.log(values);
    console.log(values.length);
    res.send(JSON.stringify(values));
    db.close();
  });
});

module.exports = router;
