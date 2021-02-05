
const router = require("express").Router();


router
  .post("/add", (req, res, next) => {

    const ticker = req.body.callTicker;
    const splitTicker = ticker.split("_").length;
    const market = splitTicker === 1 ? callStock(ticker) : callForex(ticker);
    next()
      
     
     });



module.exports = router
