const db = require("../models");
const router = require("express").Router();
const cron = require('node-cron');
require('dotenv').config({ path: '../../.env' });
const API_KEY = process.env.Alpha_API_KEY;
const fetch = require('node-fetch');



callStock(ticker)
















router
  .post("/add", (req, res, next) => {
    const {ticker} = req.body ;
    const splitTicker = ticker.split("_").length;
    console.log(splitTicker)
    //const market = splitTicker === 1 ? callStock(ticker) : callForex(ticker);
    next()
      
     
     });



module.exports = router

// db.WatchList.createPermenentWatchList(Symbol)
//  .then(db.WatchList.insertToPermenentWatchList(Symbol,{ Symbol, date , Open, High, Low, Close, Volume, maxHigh, minLow, market, strategy, marketTrend, timeFrame, tradeDuration, startingDateInfo, endingDateInfo }))
//  