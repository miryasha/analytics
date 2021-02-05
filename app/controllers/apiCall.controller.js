const db = require("../models");
const router = require("express").Router();
const cron = require('node-cron');
require('dotenv').config({ path: '../../.env' });
const API_KEY = process.env.Alpha_API_KEY;
const fetch = require('node-fetch');



const callStock = (ticker) => {

  db.apiCall.insertStockTable({ ticker })
    
    .then(() => {

      const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&outputsize=full&apikey=" + API_KEY;
      const response = fetch(url)
        .then(res => res.json()) // expecting a json response
        .then(data => {

          const callStockFirstTime = async (data) => {

            const Symbol = await data["Meta Data"]["2. Symbol"];
            const ohlcData = await data["Time Series (Daily)"];
            const dataToArray = await Object.entries(ohlcData);  //loop throgh all keys & values

            for (let count = 0; count < dataToArray.length; count++) {

              const date = await dataToArray[count][0];//brings back the dates
              const Open = await dataToArray[count][1]["1. open"];
              const High = await dataToArray[count][1]["2. high"];
              const Low = await dataToArray[count][1]["3. low"];
              const Close = await dataToArray[count][1]["4. close"];
              const Volume = await dataToArray[count][1]["5. volume"];
              //const OHLCV = await (Symbol, date, Open, High, Low, Close, Volume);
              //console.log(OHLCV)       
              db.apiCall.insert({ Symbol, date, Open, High, Low, Close, Volume });
            }

          };//this is the end of callStockFirstTime func

          callStockFirstTime(data)

        })
        .then(() => { console.log("successfully Stock added "); })

        .catch(err => { console.log(err); });

    });
};//==end of callStock function




//=====call the forex for the first_time
const callForex = (ticker) => {
  const splitTicker = ticker.split("_");
  const tickerOne = splitTicker[0];
  const tickerTwo = splitTicker[1];
  db.apiCall.insertForexTable({ ticker })
    
    .then(() => {
      const url = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=" + tickerOne + "&to_symbol=" + tickerTwo + "&outputsize=full&apikey=" + API_KEY;
      const response = fetch(url)
        .then(res => res.json())
        .then(data => {

          const callForexFirstTime = async (data) => {

            const SymbolOne = await data["Meta Data"]["2. From Symbol"];
            const SymbolOned = await (SymbolOne + "_");
            const SymbolTwo = await data["Meta Data"]["3. To Symbol"];
            const Symbol = await SymbolOned + SymbolTwo;
            const ohlcData = await data["Time Series FX (Daily)"];
            const dataToArray = await Object.entries(ohlcData);  //loop throgh all keys & values
            for (let count = 0; count < dataToArray.length; count++) {

              const date = await dataToArray[count][0];//brings back the dates
              const Open = await dataToArray[count][1]["1. open"];
              const High = await dataToArray[count][1]["2. high"];
              const Low = await dataToArray[count][1]["3. low"];
              const Close = await dataToArray[count][1]["4. close"];
              const Volume = "NaN";
              //console.log(Symbol, date, Open, High, Low, Close, Volume)       
              db.apiCall.insert({ Symbol, date, Open, High, Low, Close, Volume });
            }


          };//this is the end of callForexFirstTime func
          callForexFirstTime(data)
        })//end of inner then data
        .then(() => { console.log("successfully forex added "); })

        .catch(err => { console.log(err); });

    });//end of secend then for extraction need catch


};//==end of callForex function






// check wich market is
router
  .post("/firstCall", (req, res, next) => {
    const ticker = req.body.callTicker;
    const splitTicker = ticker.split("_").length;
    const market = splitTicker === 1 ? callStock(ticker) : callForex(ticker);
    next()
  });///============


// //*/4 * * * * *
// seach for "List of tz database time zones" for names
//call the stock for Time Zone": "US/Eastern"
const callScheduleForStock = cron.schedule(' 30 16 * * *', () => {////////=======

  db.apiCall.findAllStock()
    .then((data) => {

      data.forEach(
        (data, index) => {
          setTimeout(() => { //the work we want to perform with delay
            const symbols = data.ticker;
            const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbols + "&outputsize=full&apikey=" + API_KEY;
            const response = fetch(url)
              .then(res => res.json())
              .then(data => {

                const callStockDaily = async (data) => {

                  const count = 0;
                  const Symbol = await data["Meta Data"]["2. Symbol"];
                  const ohlcData = await data["Time Series (Daily)"];
                  const dataToArray = await Object.entries(ohlcData);  //loop throgh all key values

                  const date = await dataToArray[count][0];//brings back the dates
                  const Open = await dataToArray[count][1]["1. open"];
                  const High = await dataToArray[count][1]["2. high"];
                  const Low = await dataToArray[count][1]["3. low"];
                  const Close = await dataToArray[count][1]["4. close"];
                  const Volume = await dataToArray[count][1]["5. volume"];
                  //console.log(Symbol, date, Open, High, Low, Close, Volume)
                  db.apiCall.insert({ Symbol, date, Open, High, Low, Close, Volume });

                }//end of the func

                callStockDaily(data)

              }).catch(err => { console.log(err); });//secend then ended

          }, index * 30000); //end if seTimeout



        })//end of forEach loop

    })//==end Of first then

}, {
  scheduled: true,
  timezone: "America/Chicago"
});////////=======End of schedule  for stock




//call the forex for the " Time Zone": "UTC" closing time for us is 16 15,59
const callScheduleForForex = cron.schedule('58 15 * * *', () => {////////=======

  db.apiCall.findAllForex()
    .then((data) => {

      data.forEach(
        (data, index) => {
          setTimeout(() => { //the work we want to perform with delay
            const symbols = data.ticker;
            const splitTicker = symbols.split("_");
            const tickerOne = splitTicker[0];
            const tickerTwo = splitTicker[1];

            const url = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=" + tickerOne + "&to_symbol=" + tickerTwo + "&outputsize=full&apikey=" + API_KEY;
            const response = fetch(url)
              .then(res => res.json())
              .then(data => {
                const callForexFirstTime = async (data) => {

                  const count = 0;
                  const SymbolOne = await data["Meta Data"]["2. From Symbol"];
                  const SymbolOned = await (SymbolOne + "_");
                  const SymbolTwo = await data["Meta Data"]["3. To Symbol"];
                  const Symbol = await SymbolOned + SymbolTwo;
                  const ohlcData = await data["Time Series FX (Daily)"];
                  const dataToArray = await Object.entries(ohlcData);  //loop throgh all keys & values


                  const date = await dataToArray[count][0];//brings back the dates
                  const Open = await dataToArray[count][1]["1. open"];
                  const High = await dataToArray[count][1]["2. high"];
                  const Low = await dataToArray[count][1]["3. low"];
                  const Close = await dataToArray[count][1]["4. close"];
                  const Volume = "NaN";
                  //console.log(Symbol, date, Open, High, Low, Close, Volume)       
                  db.apiCall.insert({ Symbol, date, Open, High, Low, Close, Volume });



                };//this is the end of callForexFirstTime func
                callForexFirstTime(data)


              }).catch(err => { console.log(err); });//secend then ended

          }, index * 30000); //end if seTimeout



        })//end of forEach loop

    })//==end Of first then

}, {
  scheduled: true,
  timezone: "America/Chicago"
});////////=======End of schedule for Forex






callScheduleForStock.start();

callScheduleForForex.start();

module.exports = router;