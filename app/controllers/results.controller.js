const router = require("express").Router();




















router
  .post("/add", (req, res, next) => {
    const {ticker} = req.body ;
    const splitTicker = ticker.split("_").length;
    const market = splitTicker === 1 ? callStock(ticker) : callForex(ticker);
    next()
      
     
     });



module.exports = router

// db.WatchList.createPermenentWatchList(Symbol)
//  .then(db.WatchList.insertToPermenentWatchList(Symbol,{ Symbol, date , Open, High, Low, Close, Volume, maxHigh, minLow, market, strategy, marketTrend, timeFrame, tradeDuration, startingDateInfo, endingDateInfo }))
//  