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
  {ticker}


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