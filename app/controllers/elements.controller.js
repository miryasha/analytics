const db = require("../models")
const router = require("express").Router();

const sanitizeHtml = require("sanitize-html");



router
  .post("/addStrategy", (req, res, next) => {

    const Strategy_name = sanitizeHtml(req.body.Strategy_name);
    db.elements.insertStrategy({Strategy_name}).then(() => {
      console.log("Strategy saved successfully");
    }).catch(err => {
      console.log(err);
      res.status(500).end();
    })


  });


router
.post("/addTimeFrame", (req, res, next) => {
  
  const Time_frame = sanitizeHtml(req.body.Time_frame) ;
     db.elements.insertTime_frame({Time_frame}).then(() => {
      console.log("Time_frame saved successfully");
    }).catch(err => {
      console.log(err);
      res.status(500).end();
    })

});


router
.post("/addTicker", (req, res, next) => {
  
  const Ticker_name = sanitizeHtml(req.body.name) ;
  const Ticker_Description =sanitizeHtml(req.body.description) ;
  const Ticker_market = sanitizeHtml(req.body.market) ;

    db.elements.insertTicker_name({Ticker_name,Ticker_Description, Ticker_market}).then(() => {
      console.log("Ticker_name saved successfully");
    }).catch(err => {
      console.log(err);
      res.status(500).end();
    })
});



module.exports = router


