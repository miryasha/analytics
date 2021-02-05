db.WatchList.findRow(id)
.then(data => {
          data.forEach(
            elements => {
           const { ticker, market, strategy, marketTrend, timeFrame, startingDate, endingDate, tradeDuration, startingDateInfo, endingDateInfo } = elements;
           db.Results.findAllBetween(ticker,startingDate, endingDate)
           

            .then( allData =>{
                                 
             const mapHigh = allData.map((e) => { return  e.High});//calculate max
             const maxHigh = Math.max(...mapHigh);
             

             const mapLow = allData.map((e) => { return  e.Low});//calculate min
             const minLow = Math.min(...mapLow);


             const whichDateWasMax = allData.map((e) => { if( parseFloat(e.High) ===  maxHigh   ){return e.date } else { return } ;});
             const dateMax =  whichDateWasMax.filter(e => e).toString();//in which date maximum has hit
             
             
             
             const whichDateWasMin = allData.map((e) => { if( parseFloat(e.Low) ===  minLow   ){return e.date } else { return } ;});
             const dateMin =  whichDateWasMin.filter(e => e).toString();//in which date maximum has hit
                                 

             const mapStartPrice = allData.map((e) => { if( e.date === startingDate ) { return e.Open } else { return } ; });
             const startPriceString = mapStartPrice.filter(e => e).toString();//it will delete the empty values
             const startPrice = parseFloat(startPriceString);//changing data type from string to number
             

             const mapEndPrice = allData.map((e) => { if( e.date === endingDate ) { return e.Close } else { return } ; });
             const endPriceString = mapEndPrice.filter(e => e).toString();//it will delete the empty values
             const endPrice = parseFloat(endPriceString); //changing data type from string to number



               let whenMaxMinHit = [];
               
               const dateDuration =  (startDay, endDay) => {
               const startingDate =  new Date(startDay);
               const endingDate =  new Date(endDay);
               // time difference
               const timeDiff =  Math.abs(endingDate.getTime() - startingDate.getTime());
               // days difference
               const dateDuration =  Math.ceil(timeDiff / (1000 * 3600 * 24));
               whenMaxMinHit.push(dateDuration);
             };

             //calculate How many day it took to hit max price compare to openin
             dateDuration(startingDate,dateMax);
             const whenMaxHitAfterOpening = whenMaxMinHit[0];


             //calculate How many day it took to hit mix price compare to openin
             dateDuration(startingDate,dateMin);
             const whenMinHitAfterOpening = whenMaxMinHit[1];
                          
             const maxDiffToOpen = startPrice - maxHigh ;
             const maxDiffToClose = maxHigh - endPrice ;
             const minDiffToOpen = startPrice - minLow;
             const minDiffToClose = minLow - endPrice ;
             const openDiffToClose = startPrice - endPrice ;
             
             //console.log(maxDiffToClose)
             //console.log(maxHigh,minLow,startPrice,endPrice, maxDiffToOpen, maxDiffToClose, minDiffToOpen, minDiffToClose, openDiffToClose)
             let message = '';
             const positionResults = ( startPrice, endPrice) => {
                const expreion = startPrice >= endPrice ? "Sell" : "Buy"
                   
               switch (expreion) {

                 case "Sell"://case of wining sell
                      message =  "Sell Won ,Buy Lost, Neutral";                     
                   
                 break;

                 case  "Buy" ://case of wining buy
                        
                      message = "Buy Won,Sell Lost, Neutral";   
                 break;
                   //case "Neutral":

                 default:
                   // code block
                   message = "Neutral";
               }
             };

              positionResults(startPrice, endPrice);
                                  
                                 //console.log(ticker, startingDateInfo, endingDateInfo, tradeDuration, market, strategy, marketTrend, timeFrame,  startPrice, endPrice, openDiffToClose, maxHigh, dateMax, whenMaxHitAfterOpening, maxDiffToOpen, maxDiffToClose, minLow, dateMin, whenMinHitAfterOpening, minDiffToOpen, minDiffToClose,message)
              db.Results.insertToResult({ticker, startingDateInfo, endingDateInfo, tradeDuration, market, strategy, marketTrend, timeFrame,  startPrice, endPrice, openDiffToClose, maxHigh, dateMax, whenMaxHitAfterOpening, maxDiffToOpen, maxDiffToClose, minLow, dateMin, whenMinHitAfterOpening, minDiffToOpen, minDiffToClose,message})
       
             })
             .then(db.WatchList.deleteFromPassng(id))
             .catch(err => {
              console.log(err);
               res.status(500).end();
               });
            
          });

         })


    //      {
    //      "2021-02-04": {
    //       "1. open": "119.9100",
    //       "2. high": "121.1000",
    //       "3. low": "118.8700",
    //       "4. close": "121.0200",
    //       "5. volume": "4562124"
    //   },
    //   "2021-02-03": {
    //       "1. open": "119.0400",
    //       "2. high": "119.8000",
    //       "3. low": "118.1200",
    //       "4. close": "119.1200",
    //       "5. volume": "6715366"
    //   },
    //   "2021-02-02": {
    //       "1. open": "119.3600",
    //       "2. high": "121.0000",
    //       "3. low": "119.2800",
    //       "4. close": "119.4400",
    //       "5. volume": "6311881"
    //   },
    //   "2021-02-01": {
    //       "1. open": "119.9000",
    //       "2. high": "120.9500",
    //       "3. low": "118.7300",
    //       "4. close": "120.5400",
    //       "5. volume": "6250508"
    //   }
    // }