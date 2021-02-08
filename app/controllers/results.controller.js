const db = require("../models");
const router = require("express").Router();
const cron = require('node-cron');
require('dotenv').config({ path: '../../.env' });
const API_KEY = process.env.Alpha_API_KEY;
const fetch = require('node-fetch');
const connection = require("../cofig/dbConnection");



const callStock = (id) =>{

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
                                        
                              
                                         resultMaker(symbol, dateTD, open, high, low, close,market, strategy, marketTrend, timeFrame, startingDate, durationWD, id); 
                                            
                                        }; //== end of for loop to find the data between two dates

                                 };//==end of callStock
                                 callStock(data).catch(err => { console.log(err); });
                              })//==end third then afrer res.json()
                       
                     });//==end first forEach
                                
        }).catch(err => {
          console.log(err);
           //res.status(500).end();
       });//==end first then
                   
                   const resultMaker = (symbol, dateTD, open, high, low, close, market, strategy, marketTrend, timeFrame, startingDate, durationWD,id) =>{
                    
                    db.Results.insertPassingresults({symbol, dateTD, open, high, low, close, market, strategy, marketTrend, timeFrame, startingDate, durationWD})
                    //.then(db.WatchList.deleteFromPassng(id))
                    .then(results())
                    .catch(err => {console.log(err);});

                   };//end of resultMaker func
         
                           
  };//=end callStock func
  

//   //call forex
// ////===============================================

// const callForex = (id, ticker) =>{
//   const splitTicker = ticker.split("_");
//   const tickerOne = splitTicker[0];
//   const tickerTwo = splitTicker[1];

//   db.WatchList.findRow(id)
//          .then(data => {
//                data.forEach(elements => {
//                  const {ticker, market, strategy, marketTrend, timeFrame, startingDate, durationWD} = elements;
//                  const url = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=" + tickerOne + "&to_symbol=" + tickerTwo + "&outputsize=full&apikey=" + API_KEY;
//                  const response = fetch(url)
//                  .then(res => res.json())
//                  .then(data => {  
//                               const callStock = async (data) =>{

//                                    const symbolOne = await data["Meta Data"]["2. From Symbol"];
//                                    const symbolOned = await (symbolOne + "_");
//                                    const symbolTwo = await data["Meta Data"]["3. To Symbol"];
//                                    const symbol = await symbolOned + symbolTwo;
//                                    const ohlcData = await data["Time Series FX (Daily)"];
//                                    const dataToArray = await Object.entries(ohlcData);  //loop throgh all keys & values
//                                    let index = ''; 
//                                    let loopCounter = await parseInt(durationWD);  
                                      
//                                    //loop inseide the data to index to ending day
//                                     for (let counter = 0; counter < dataToArray.length; counter++) {
//                                    const date =  dataToArray[counter][0];//==brings back the dates
                                                
//                                     if(dataToArray[counter][0] === startingDate){ index = counter} ; //== End of if statement 
                                  
//                                     }; //== End of for loop to find the index of ending day
//                                     let numberOfLoops = await parseInt(index - loopCounter); 
                                    
                                    
//                                    for (let count = index; count >= numberOfLoops ;  count--) {
                              
//                                         const dateTD = await dataToArray[count][0];
//                                         const open = await dataToArray[count][1]["1. open"];
//                                         const high = await dataToArray[count][1]["2. high"];
//                                         const low =  await dataToArray[count][1]["3. low"];
//                                         const close = await dataToArray[count][1]["4. close"];
                                        
                              
//                                          resultMaker(symbol, dateTD, open, high, low, close,market, strategy, marketTrend, timeFrame, startingDate, durationWD, id); 
                                            
//                                         }; //== end of for loop to find the data between two dates

//                                  };//==end of callStock
//                                  callStock(data).catch(err => { console.log(err); });
//                               })//==end third then afrer res.json()
                       
//                      });//==end first forEach
                                
//         }).catch(err => {
//           console.log(err);
//            //res.status(500).end();
//        });//==end first then
                   
//                    const resultMaker = (symbol, dateTD, open, high, low, close, market, strategy, marketTrend, timeFrame, startingDate, durationWD, id) =>{
                    
//                     db.Results.insertPassingresults({symbol, dateTD, open, high, low, close, market, strategy, marketTrend, timeFrame, startingDate, durationWD})
//                     //.then(db.WatchList.deleteFromPassng(id))
//                     .then(results())
//                     .catch(err => {console.log(err);});

//                    };//end of resultMaker func
         
                           
//   };//=end callForex func

//  ////==============================================

  
 
//==make results
const results = async () => {
   db.Results.findAllPending()
   .then(data => {
     
    const calculateResults = async (data) =>{

       const symbol = await  data[0]["symbol"];
       const market = await data[0]["market"];
       const strategy = await data[0]["strategy"];
       const marketTrend = await data[0]["marketTrend"];
       const timeFrame = await data[0]["timeFrame"];
       const durationWD = await data[0]["durationWD"];
      ///=======max cals
      const mapHigh = await data.map((e) => { return  e.high});//calculate max
      const maxHigh = await Math.max(...mapHigh);
      const whichDateWasMax = await data.map((e) => { if( parseFloat(e.high) ===  maxHigh ) {return e.dateTD } else { return } ;});
      const dateMax =  await whichDateWasMax.filter(e => e).toString();//in which date maximum has hit  
      const maxHitAftermap = await data.map(e => {if (dateMax === e.dateTD) {return e.ID} else { return };});
      const maxHitAfterDays = await maxHitAftermap.filter(e => e).toString();

     ///=========min cals
      const mapLow = await data.map((e) => { return  e.low});//calculate min
      const minLow = await Math.min(...mapLow);
      const whichDateWasMin = await data.map((e) => { if (parseFloat(e.low) === minLow) { return e.dateTD } else { return }; });
      const dateMin = await whichDateWasMin.filter(e => e).toString();
      const minHitAftermap = await data.map(e => {if (dateMin === e.dateTD) {return e.ID } else { return };});
      const minHitAfterDays = await minHitAftermap.filter(e => e).toString();
      
      
        ///==starting cals
      const mapStartingDate = await data.map(e => { if(e.startingDate === e.dateTD){return e.dateTD } else { return } ;});
      const startingDate = await mapStartingDate.filter(e => e).toString();
      const mapStartPrice = await data.map(e => { if(e.startingDate === e.dateTD){return e.open } else { return } ;});
      const filterStartPrice = await mapStartPrice.filter(e => e).toString();
      const startPrice = await parseFloat(filterStartPrice);

      ///==ending cals
      const mapEndingDate = await data.map(e => {if( parseInt(e.durationWD) + 1 === parseInt(e.ID) ){return e.dateTD } else { return };});
      const endigDate = await mapEndingDate.filter(e => e).toString();
      const mapEndPrice = await data.map(e => { if(parseInt(e.durationWD) + 1 === parseInt(e.ID)){return e.close } else { return } ;});
      const filterEndPrice = await mapEndPrice.filter(e => e).toString();
      const endPrice = await parseFloat(filterEndPrice);

      ///==diff cals
     const maxDiffToOpen = await startPrice - maxHigh;
     const maxDiffToClose = await maxHigh - endPrice;
     const minDiffToOpen = await startPrice - minLow;
     const minDiffToClose = await minLow - endPrice;
     const openDiffToClose = await startPrice - endPrice;

     //message for win/ loss
     let statusTrade = await '';
             const positionResults = ( startPrice, endPrice) => {
                const expreion = startPrice >= endPrice ? "Sell" : "Buy"
                   
               switch (expreion) {

                 case "Sell"://case of wining sell
                 statusTrade =  "Sell Won ,Buy Lost, Neutral";                     
                   
                 break;

                 case  "Buy" ://case of wining buy
                        
                 statusTrade = "Buy Won,Sell Lost, Neutral";   
                 break;
                   //case "Neutral":

                 default:
                   // code block
                   statusTrade = "Neutral";
               }
             };

              positionResults(startPrice, endPrice);
             
                          return {
                            symbol, market, strategy, marketTrend, timeFrame, durationWD, statusTrade,
                            startingDate, startPrice, endigDate, endPrice,
                            maxHigh, dateMax, maxHitAfterDays,
                            minLow, dateMin, minHitAfterDays,
                            maxDiffToOpen, maxDiffToClose, minDiffToOpen, minDiffToClose, openDiffToClose
                              };
       

     };//end of calculateResults func
     
     calculateResults(data)
     .then(data =>{console.log(data);})//db.Results.insertToResult(data)
     //.then(db.Results.deletePending())
     .catch(err => {console.log(err);});
     
     
   })//==end of findAll Pending then

};//==end of results

results()


router
  .post("/add", (req, res, next) => {
    const {id,ticker} = req.body ;
    const splitTicker = ticker.split("_").length;
    const market = splitTicker === 1 ? callStock(id) : callForex(id,ticker);
    next()
      
  });



module.exports = router 