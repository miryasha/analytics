const db = require("../models");

const router = require("express").Router();

// Get all tickers name and send it to ? page
router
  .get("/callTicker", (req, res, next) => {
      db.elements.findAllTickers().then(tickerName => {
      res.json(tickerName);
      //console.log(tickerName)
    }).catch(err => {
      console.log(err);
      res.status(500).end();
    })

  });



module.exports = router