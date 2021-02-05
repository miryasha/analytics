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
                 //const symbols = ticker;
                 const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&outputsize=full&apikey=" + API_KEY;
                 const response = fetch(url)
                 .then(res => res.json())
                 .then(data => {  
                          
                        const Symbol =  data["Meta Data"]["2. Symbol"];
                        const ohlcData =  data["Time Series (Daily)"];
                        const dataToArray =  Object.entries(ohlcData);  //loop throgh all keys & values
                        let index = ''; 
                        let loopCounter = parseInt(tradeDuration) + 1;  
                        let loopStatement =    index + loopCounter;                       
                       //loop inseide the data to index to ending day
                           for (let counter = 0; counter < dataToArray.length; counter++) {
                                const date =  dataToArray[counter][0];//==brings back the dates
                                                
                              if(dataToArray[counter][0] === endingDate){ index = counter} ; //== End of if statement 
                                  
                            }; //== End of for loop to find the index of ending day
                         
                          let count = index
                          for ( count ; count <= loopStatement  ; count++) {

                           const date =  dataToArray[count][0];
                           const Open =  dataToArray[count][1]["1. open"];
                           const High =  dataToArray[count][1]["2. high"];
                           const Low =  dataToArray[count][1]["3. low"];
                           const Close =  dataToArray[count][1]["4. close"];
                           const Volume =  dataToArray[count][1]["5. volume"];
                           //const OHLCV =  (Symbol, date, Open, High, Low, Close, Volume);
                           console.log(Symbol, date, Open, High, Low, Close, Volume)       
                          
                        }; //== End of for loop to find the data between two dates





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