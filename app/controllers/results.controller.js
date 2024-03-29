const db = require("../models");
const router = require("express").Router();
const cron = require('node-cron');
require('dotenv').config({ path: '../../.env' });
const API_KEY = process.env.Alpha_API_KEY;
const fetch = require('node-fetch');
const connection = require("../cofig/dbConnection");



const callStock = (id,durationDays) =>{
  
  db.WatchList.findRow(id)
         .then(data => {
               data.forEach(elements => {
                 const {ticker, market, strategy, marketTrend, timeFrame, startingDate} = elements;
                 const durationWD = durationDays;           
                 const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&outputsize=full&apikey=" + API_KEY;
                 const response = fetch(url)
                 .then(res => res.json())
                 .then(data => {  
                              const callStock = async (data) =>{
                                   const symbol = await data["Meta Data"]["2. Symbol"];
                                   const ohlcData = await data["Time Series (Daily)"];
                                   const dataToArray =  Object.entries(ohlcData);  //loop throgh all keys & values
                                   let index = ''; 
                                   let loopCounter =  parseInt(durationWD);  
                                      
                                   //loop inseide the data to index to ending day
                                    for (let counter = 0; counter < dataToArray.length; counter++) {
                                   const date =  dataToArray[counter][0];//==brings back the dates
                                                
                                    if(dataToArray[counter][0] === startingDate){ index = counter} ; //== End of if statement 
                                  
                                    }; //== End of for loop to find the index of ending day
                                    let numberOfLoops =  parseInt(index - loopCounter); 
                                    
                                    
                                   for (let count = index; count >= numberOfLoops ;  count--) {
                              
                                        const dateTD = await dataToArray[count][0];
                                        const open = await dataToArray[count][1]["1. open"];
                                        const high = await dataToArray[count][1]["2. high"];
                                        const low =  await dataToArray[count][1]["3. low"];
                                        const close = await dataToArray[count][1]["4. close"];
                                        
                              
                                         resultMaker(symbol, dateTD, open, high, low, close,market, strategy, marketTrend, timeFrame, startingDate, durationWD, id);
                                         //.catch(err => { console.log(err); })
                                            
                                        }; //== end of for loop to find the data between two dates

                                 };//==end of callStock
                                 callStock(data).catch(err => { console.log(err); });
                              })//==end third then afrer res.json()
                       
                     });//==end first forEach
                                
        }).catch(err => {
          console.log(err);
           //res.status(500).end();
       });//==end first then
                   
                   const resultMaker =  (symbol, dateTD, open, high, low, close, market, strategy, marketTrend, timeFrame, startingDate, durationWD,id) =>{
                    
                      db.Results.insertPassingresults({symbol, dateTD, open, high, low, close, market, strategy, marketTrend, timeFrame, startingDate, durationWD})
                      .then(results(durationWD))
                      .catch(err => {console.log(err);});
                    
                   };//end of resultMaker func
         
                           
  };//=end callStock func
  





// // ////===============================================
//call forex


const  callForex = (id,ticker, durationDays) =>{
  
  const splitTicker = ticker.split("_");
  const tickerOne = splitTicker[0];
  const tickerTwo = splitTicker[1];
  db.WatchList.findRow(id)
         .then(data => {
               data.forEach(elements => {
                 const {ticker, market, strategy, marketTrend, timeFrame, startingDate} = elements;
                 const durationWD = durationDays;
                 
                 const url = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=" + tickerOne + "&to_symbol=" + tickerTwo + "&outputsize=full&apikey=" + API_KEY;
                 const response = fetch(url)
                 .then(res => res.json())
                 .then(data => {  
                              const callforex = async (data) =>{


                                   const symbolOne = await data["Meta Data"]["2. From Symbol"];
                                   const symbolOned =  (symbolOne + "_");
                                   const symbolTwo = await data["Meta Data"]["3. To Symbol"];
                                   const symbol =  symbolOned + symbolTwo;
                                   const ohlcData = await data["Time Series FX (Daily)"];
                                   const dataToArray =  Object.entries(ohlcData);  //loop throgh all keys & values
                                   let index = ''; 
                                   let loopCounter =  parseInt(durationWD);  
                                      
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
                                        
                              
                                         resultMaker(symbol, dateTD, open, high, low, close,market, strategy, marketTrend, timeFrame, startingDate, durationWD, id) 
                                          
                                        }; //== end of for loop to find the data between two dates

                                 };//==end of callStock
                                 callforex(data).catch(err => { console.log(err); });
                              })//==end third then afrer res.json()
                       
                     });//==end first forEach
                                
        }).catch(err => {console.log(err);
           //res.status(500).end();
       });//==end first then
                   
                   const resultMaker =  (symbol, dateTD, open, high, low, close, market, strategy, marketTrend, timeFrame, startingDate, durationWD,id) =>{
                    
                      db.Results.insertPassingresults({symbol, dateTD, open, high, low, close, market, strategy, marketTrend, timeFrame, startingDate, durationWD})
                     .then(results(durationWD))
                     .catch(err => {console.log(err);});
                          
                    };//end of resultMaker func
         
                           
  };//=end callForex func


//  ////==============================================

  
 
//==make results
const results =  (duration) => {
   const durationWD = duration;

    db.Results.findAllPending(durationWD)
   .then(data => {
    
    const resultMaker = async (data) =>{
      const symbol = await  data[0]["symbol"];
      const market =  await data[0]["market"];
      const strategy = await data[0]["strategy"];
      const marketTrend = await data[0]["marketTrend"];
      const timeFrame = await data[0]["timeFrame"];
      const durationWD = await data[0]["durationWD"];

       ///==starting cals
      const mapStartingDateID = await data.map(e => { if(e.startingDate === e.dateTD){return e.ID } else { return } ;}); 
      const startindID =  await mapStartingDateID.filter(e => e);

      const mapStartingDate = await data.map(e => { if(e.startingDate === e.dateTD){return e.dateTD } else { return } ;});
      const startingDate = await mapStartingDate.filter(e => e).toString();
      const mapStartPrice = await data.map(e => { if(e.startingDate === e.dateTD){return e.open } else { return } ;});
      const filterStartPrice = await mapStartPrice.filter(e => e).toString();
      const startPrice =  parseFloat(filterStartPrice);
      
            ///==ending cals                           
      const findEndingid = await data.map(e => {if( e.startingDate === e.dateTD ){const endID = parseInt(e.durationWD) + e.ID; return endID } else { return };});
      const endingID = await findEndingid.filter(e => e);
      const mapEndingdate = await data.map(e => {if( parseInt(endingID) === e.ID) {return e.dateTD} else { return }; });
      const endigDate = await mapEndingdate.filter(e => e).toString();
    
      const mapEndPrice = await data.map(e => { if(parseInt(endingID) === e.ID){return e.close } else { return } ;});
      const filterEndPrice = await mapEndPrice.filter(e => e).toString();
      const endPrice =  parseFloat(filterEndPrice);
      
         ///=======max cals
      const mapHigh = await data.map((e) => { return  e.high});//calculate max
      const maxHigh =  Math.max(...mapHigh);
      const whichDateWasMax = await data.map((e) => { if( parseFloat(e.high) ===  maxHigh ) {return e.dateTD } else { return } ;});
      const dateMax =  await whichDateWasMax.filter(e => e).toString();//in which date maximum has hit  
      const maxHitAftermap = await data.map(e => {if ( dateMax === e.dateTD ) { const whenMaxDate = e.ID - startindID ; return whenMaxDate.toString() } else { return };});
      const maxHitAfterDays = await maxHitAftermap.filter(e => e).toString();
       
        ///=========min cals
      const mapLow = await data.map((e) => { return  e.low});//calculate min
      const minLow =  Math.min(...mapLow);
      const whichDateWasMin = await data.map((e) => { if (parseFloat(e.low) === minLow) { return e.dateTD } else { return }; });
      const dateMin = await whichDateWasMin.filter(e => e).toString();
      const minHitAftermap = await data.map(e => {if ( dateMin === e.dateTD ) { const whenMinDate = e.ID - startindID ; return whenMinDate.toString() } else { return };});
      const minHitAfterDays = await minHitAftermap.filter(e => e).toString();
       
       ///==diff cals
      const maxDiffToOpen =  parseFloat(startPrice - maxHigh);
      const maxDiffToClose =  parseFloat(maxHigh - endPrice);
      const minDiffToOpen =  parseFloat(startPrice - minLow);
      const minDiffToClose =  parseFloat(minLow - endPrice);
      const openDiffToClose =  parseFloat(startPrice - endPrice);
          
       //message for win/ loss
       let statusTrade =  '';
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

             positionResults(startPrice, endPrice)

                     
             db.Results.deletePending(durationWD).catch(err => {console.log(err);});
             return {symbol, market, strategy, marketTrend, timeFrame, durationWD, statusTrade,startingDate, startPrice, endigDate, endPrice,maxHigh, dateMax, maxHitAfterDays, minLow, dateMin, minHitAfterDays,maxDiffToOpen, maxDiffToClose, minDiffToOpen, minDiffToClose, openDiffToClose};

          
    };//end of async func
      
     
    resultMaker(data)
    .then(data => { 
     const {symbol, market, strategy, marketTrend, timeFrame, durationWD, statusTrade,startingDate, startPrice, endigDate, endPrice,maxHigh, dateMax, maxHitAfterDays, minLow, dateMin, minHitAfterDays,maxDiffToOpen, maxDiffToClose, minDiffToOpen, minDiffToClose, openDiffToClose} = data;
     //check if is Nan do not send it ro database
     if(
      isNaN(minDiffToClose) &&
      isNaN(openDiffToClose) 
      //isNaN(minDiffToClose)  &&
     // isNaN(minDiffToClose)  &&
      ){
            //do nothing just for fun     
   
       }else{
        db.Results.insertToResult({symbol, market, strategy, marketTrend, timeFrame, durationWD, statusTrade,startingDate, startPrice, endigDate, endPrice,maxHigh, dateMax, maxHitAfterDays, minLow, dateMin, minHitAfterDays,maxDiffToOpen, maxDiffToClose, minDiffToOpen, minDiffToClose, openDiffToClose})
        .catch(err => {console.log(err);});
        
       };
     
    })
    

   })//==end of findAll Pending then
   .catch(err => {console.log(err);});

};//==end of results

router
  .post("/add", (req, res, next) => {
    const {id,ticker,duration} = req.body ;
    const lenghtOfDays = duration.split(",").length;
    const splitTicker = ticker.split("_").length;

     const loopCall = () =>{
             const sleep = (time) => {
                    return new Promise((resolve) => setTimeout(resolve, time))
               };

           const doSomething = async () => {
                 
                 
                 
                  for ( let j = 0 ; j < lenghtOfDays; j++) {

                    await sleep(5000)
   
                     const durationDays = duration.split(",")[j];
                     
                     const market = splitTicker === 1 ? callStock(id,durationDays) : callForex(id,ticker,durationDays);
                     if (j + 1 === lenghtOfDays)
                     {
                       setTimeout(()=>{
                         db.WatchList.deleteFromPassng(id)
                         .catch(err =>  console.log("Error: Could`n delete from watchlist"+err));
                         
                        },5000);//end of settimeout in order to delete the watchlist
                       
                      } ;//end of if statement
                     
                     
                  };//end of for loop


                 
                 

            };//end of do somthing

         doSomething()
        .catch(err => { console.log(err); });

    };//end if loopCall function
       
     loopCall();
     
     
    
    //next()
      
  });



module.exports = router 
