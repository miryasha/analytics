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
                 const {ticker, market, strategy, marketTrend, timeFrame, startingDate, durationWD} = elements;
                 const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&outputsize=full&apikey=" + API_KEY;
                 const response = fetch(url)
                 .then(res => res.json())
                 .then(data => {  
                              const callStock = async (data) =>{
                                   const symbol = await data["Meta Data"]["2. Symbol"];
                                   const ohlcData = await data["Time Series (Daily)"];
                                   const dataToArray = await Object.entries(ohlcData);  //loop throgh all keys & values
                                   let index = ''; 
                                   let loopCounter = await parseInt(durationWD);  
                                      
                                   //loop inseide the data to index to ending day
                                    for (let counter = 0; counter < dataToArray.length; counter++) {
                                   const date =  dataToArray[counter][0];//==brings back the dates
                                                
                                    if(dataToArray[counter][0] === startingDate){ index = counter} ; //== End of if statement 
                                  
                                    }; //== End of for loop to find the index of ending day
                                    let numberOfLoops = await parseInt(index - loopCounter); 
                                    
                                    
                                   for (let count = index; count >= numberOfLoops ;  count--) {
                              
                                        const dateTD = await dataToArray[count][0];
                                        const open = await dataToArray[count][1]["1. open"];
                                        const high = await dataToArray[count][1]["2. high"];
                                        const low =  await dataToArray[count][1]["3. low"];
                                        const close = await dataToArray[count][1]["4. close"];
                                        const volume = await dataToArray[count][1]["5. volume"];
                              
                                         resultMaker(symbol, dateTD, open, high, low, close, volume,market, strategy, marketTrend, timeFrame, startingDate, durationWD ); 
                                            
                                        }; //== end of for loop to find the data between two dates

                                 };//==end of callStock
                                 callStock(data).catch(err => { console.log(err); });
                              })//==end third then afrer res.json()
                       
                     });//==end first forEach
                                
        }).catch(err => {
          console.log(err);
           //res.status(500).end();
       });//==end first then
                   
                   const resultMaker = (symbol, dateTD, open, high, low, close, volume, market, strategy, marketTrend, timeFrame, startingDate, durationWD) =>{
                    
                    db.Results.insertPassingresults({symbol, dateTD, open, high, low, close, volume,market, strategy, marketTrend, timeFrame, startingDate, durationWD})
                    .then(results())
                    .catch(err => {console.log(err);});

                   };//end of resultMaker func
         
                           
  };//=end callStock func
  

  //const{symbol, dateTD, open, high, low, close, volume,market, strategy, marketTrend, timeFrame, startingDate, durationWD}
//==make results
const results = () => {
   db.Results.findAllPending()
   .then(data => {
     ///=======max cals
      const mapHigh = data.map((e) => { return  e.high});//calculate max
      const maxHigh = Math.max(...mapHigh);
      const whichDateWasMax = data.map((e) => { if( parseFloat(e.high) ===  maxHigh ) {return e.dateTD } else { return } ;});
      const dateMax =  whichDateWasMax.filter(e => e).toString();//in which date maximum has hit  
      const maxHitAftermap = data.map(e => {if (dateMax === e.dateTD) {return e.ID} else { return };});
      const maxHitAfterDays = maxHitAftermap.filter(e => e).toString();

     ///=========min cals
      const mapLow = data.map((e) => { return  e.low});//calculate min
      const minLow = Math.min(...mapLow);
      const whichDateWasMin = data.map((e) => { if (parseFloat(e.low) === minLow) { return e.dateTD } else { return }; });
      const dateMin = whichDateWasMin.filter(e => e).toString();
      const minHitAftermap = data.map(e => {if (dateMin === e.dateTD) {return e.ID } else { return };});
      const minHitAfterDays = minHitAftermap.filter(e => e).toString();
      
      

      const findStartingDate = data.map(e => { if(e.startingDate === e.dateTD){return e.dateTD } else { return } ;});
      const startingDate = findStartingDate.filter(e => e).toString();
      
      const findEndingDate = data.map(e => {if( parseInt(e.durationWD) + 1 === parseInt(e.ID) ){return e.dateTD } else { return };});
      const endigDate = findEndingDate.filter(e => e).toString();
     

     
     

     
     
   })//==end of findAll Pending then
};//==end of results

results()









router
  .post("/add", (req, res, next) => {
    const {id,ticker} = req.body ;
    const splitTicker = ticker.split("_").length;
    const market = splitTicker === 1 ? callStock(id,ticker) : callForex(id,ticker);
    next()
      
     
     });



module.exports = router 