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
    let cursor = await dbo.collection("products").find({});
    const allValues = await cursor.toArray();
    res.render("product_review", {
      total: allValues.length,
      obj: allValues,
    });
    db.close();
  });
});

router.post("/", enc, (req, res) => {
  let name = req.body.product_name;
  let price = req.body.price;
  let stock = req.body.stock;

  MongoClient.connect(db_url, async (err, db) => {
    if (err) throw err;
    const dbo = db.db("a1");

    const doc = {
      name: name,
      price: price,
      stock: stock,
    };
    const result = await dbo.collection("products").insertOne(doc);
    db.close();
  });
  res.send("data successfully stored");
});
module.exports = router;
