const db = require("../models");
const router = require("express").Router();
const cron = require('node-cron');
require('dotenv').config({ path: '../../.env' });
const API_KEY = process.env.Alpha_API_KEY;
const fetch = require('node-fetch');



const callStock = (id,ticker) =>{

  db.WatchList.findRow(id)
         .then(data => {
               data.forEach(elements => {
                 const { ticker, market, strategy, marketTrend, timeFrame, startingDate, endingDate, tradeDuration, startingDateInfo, endingDateInfo } = elements;
                 const symbols = ticker;
                 const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbols + "&outputsize=full&apikey=" + API_KEY;
                 const response = fetch(url)
                 .then(res => res.json())
                 .then(data => { 
                   
                 })//==end third then afrer res.json()
     
               });//==end first forEach
                  
         })//==end first then
        

  
  





};//=end callStock func
















router
  .post("/add", (req, res, next) => {
    const {id,ticker} = req.body ;
    const splitTicker = ticker.split("_").length;
    const market = splitTicker === 1 ? callStock(id,ticker) : callForex(id,ticker);
    next()
      
     
     });



module.exports = router

// db.WatchList.createPermenentWatchList(Symbol)
//  .then(db.WatchList.insertToPermenentWatchList(Symbol,{ Symbol, date , Open, High, Low, Close, Volume, maxHigh, minLow, market, strategy, marketTrend, timeFrame, tradeDuration, startingDateInfo, endingDateInfo }))
//  