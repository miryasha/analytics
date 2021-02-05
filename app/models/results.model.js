const Base = require("./base.model");
class Results extends Base {

    findAll(){
      return this.query("SELECT * FROM  results")
    }

  //   findAllBetween(tickerName, startingDate, endingDate) {
  //     return this.query("SELECT * FROM  qoutes_daily  WHERE  Symbol = "+ tickerName +" AND date  BETWEEN  "+ startingDate +" AND  "+ endingDate +"; ");
  // }
  //SELECT * FROM qoutes_daily  where   Symbol='SPY' and date BETWEEN '2021-01-29' and '2021-02-02';

    findAllBetween(tickerName, startingDate, endingDate) {
                                                         
        return this.query(`SELECT * FROM  qoutes_daily  WHERE  Symbol = '${tickerName}' AND  date BETWEEN '${startingDate}' AND '${endingDate}' ;`);
    }
    

    insert(tickerName, data) {
        return this.query("INSERT INTO qoutes_daily" + tickerName + " SET?", [data]);
    }
    delete(tickerName, id) {
        return this.query("DELETE FROM qoutes_daily" + tickerName + " WHERE? ", [id]);
    }
    addNewColumn(tickerName, name) {
        return this.query("ALTER TABLE qoutes_daily" + tickerName + " ADD " + name + " varchar(255)");
  }

  createResult() {

    return this.query(`  
    USE mupmgx3dxemvuwyw;
    CREATE TABLE IF NOT EXISTS  results 
    (  ID int NOT NULL AUTO_INCREMENT, ticker varchar(20) NOT NULL,
     startingDateInfo varchar(30) NOT NULL,
     endingDateInfo varchar(30) NOT NULL,
     tradeDuration varchar(20) NOT NULL,
      market  varchar(20) NOT NULL,
       strategy varchar(20) NOT NULL, 
     marketTrend  varchar(20) NOT NULL,
      timeFrame   varchar(20) NOT NULL,  
     startPrice varchar(20) NOT NULL,
      endPrice varchar(20) NOT NULL, 
      openDiffToClose varchar(20) NOT NULL,
       maxHigh varchar(20) NOT NULL,
      dateMax varchar(20) NOT NULL, 
      whenMaxHitAfterOpening varchar(20) NOT NULL,
       maxDiffToOpen varchar(20) NOT NULL, 
      maxDiffToClose varchar(20) NOT NULL,
       minLow varchar(20) NOT NULL, 
       dateMin varchar(20) NOT NULL,
      whenMinHitAfterOpening varchar(20) NOT NULL,
       minDiffToOpen varchar(20) NOT NULL,
      minDiffToClose varchar(20) NOT NULL,
       message varchar(30) NOT NULL,
        PRIMARY KEY (ID) );`);
  }

  insertToResult(data) {

    return this.query("INSERT INTO  results SET ?", [data]);
  }
}
  module.exports = Results;
