const db = require("../models");
const router = require("express").Router();
const cron = require('node-cron');
require('dotenv').config({ path: '../../.env' });
const API_KEY = process.env.Alpha_API_KEY;
const fetch = require('node-fetch');
const connection = require("../cofig/dbConnection");



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
                          
                       const Symbol =  data["Meta Data"]["2. Symbol"];
                       const ohlcData =  data["Time Series (Daily)"];
                       
                       const dataToArray =  Object.entries(ohlcData);  //loop throgh all keys & values
                        
                       for (let count = 0; count < dataToArray.length; count++) {

                        const date =  dataToArray[count][0];//brings back the dates
                        const findMe = ()=>{
                           if(dataToArray[count][0] === "2021-02-04"){ console.log(count)}
                          }
                        findMe()
                         }; //== End of for loop to find the index of ending day

                         

                        const Open =  dataToArray[count][1]["1. open"];
                        const High =  dataToArray[count][1]["2. high"];
                        const Low =  dataToArray[count][1]["3. low"];
                        const Close =  dataToArray[count][1]["4. close"];
                        const Volume =  dataToArray[count][1]["5. volume"];
                        //const ohlc = [date, Open, High]
                        // console.log(ohlc)
                      //==end of for loop

                       
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