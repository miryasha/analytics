const db = require("../models");

const router = require("express").Router();


// Get all tickers and market names
router
  .get("/callTicker", (req, res, next) => {
      db.elements.findAllTickers().then(tickerName => {
      res.json(tickerName);
      
    }).catch(err => {
      console.log(err);
      res.status(500).end();
    });

  });

// Get all strategies
  router
  .get("/callstrategy", (req, res, next) => {
      db.elements.findAllStrategies().then(strategyName => {
      res.json(strategyName);
      
    }).catch(err => {
      console.log(err);
      res.status(500).end();
    });

  });

// Get all Time Frames from elements db
router
  .get("/callTimeFrame", (req, res, next) => {
      db.elements.findAllTimeFrames().then(timeFrame => {
      res.json(timeFrame);
      
    }).catch(err => {
      console.log(err);
      res.status(500).end();
    });

  });


// Get all watchlist

router
 .get("/callwatchlist",(req, res, next )=> {
   db.WatchList.findAll().then(
    watchList => res.json(watchList)
   ).catch(err => {
    console.log("Error: Query get"+err);
    res.status(500).end();
  });
});


///add a new wathlist 

router
.post("/add", (req, res, next) => {

  const {tickerMarket} = req.body;
  let ticker="";
  let market="";
  const constructor = (tickerMarket) => {
    
     const splitTicker = tickerMarket.split("_");
    if( splitTicker.length  === 2 ){  
       ticker = splitTicker[0];  market = splitTicker[1]; 
      } else 
      {  
        const tickerPartOne = splitTicker[0];     const tickerPartTwo = splitTicker[1];   ticker = `${tickerPartOne}_${tickerPartTwo}`;  market = splitTicker[2]; 
           };//end of else

  };//==end of constructor

  constructor(tickerMarket)
  console.log(ticker, market)

            
            

   
  //const {strategy, marketTrend, timeFrame, startingDate, Duration} =  req.body;
  //console.log(ticker, market, strategy, marketTrend, timeFrame, startingDate, Duration)
  
  //   const tradingDuration = async (startDay, endDay) => {
  //   const startingDateInfo = await new Date(startDay);
  //   const endingDateInfo = await new Date(endDay);
  //   // time difference
  //   const timeDiff = await Math.abs(endingDateInfo.getTime() - startingDateInfo.getTime());
  //   // days difference
  //   const tradeDuration = await Math.ceil(timeDiff / (1000 * 3600 * 24));
  //   return {tradeDuration,startingDateInfo, endingDateInfo};
  // }

  // tradingDuration(startingDate, endingDate)
  // .then((dateInfo)=>{
  //   const {tradeDuration} = dateInfo;
  //   const startingDateInfo = dateInfo.startingDateInfo.toDateString();
  //   const endingDateInfo = dateInfo.endingDateInfo.toDateString();
  //   db.WatchList.insertPassing({ticker, market, strategy, marketTrend, timeFrame, startingDate, endingDate, tradeDuration, startingDateInfo, endingDateInfo})
  //   .then(() => {
      
  //     console.log("watchlist added successfully");
  //   })
  // })
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).end();
  // });

});



module.exports = router