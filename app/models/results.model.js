const Base = require("./base.model");
class Results extends Base {

    findAll(){
      return this.query("SELECT * FROM  results")
    }

    findAllBetween(tickerName, startingDate, endingDate) {
                                                         
        return this.query(`SELECT * FROM  qoutes_daily  WHERE  Symbol = '${tickerName}' AND  date BETWEEN '${startingDate}' AND '${endingDate}' ;`);
    }
    insertPassingresults(data){
        return this.query("INSERT INTO pending_results SET?", [data]);
    }
    
    findAllPending(){
      return this.query("SELECT * FROM pending_results")
    }
    
    deletePending() {
      return this.query("DELETE FROM pending_results WHERE ID >= 0 ");
  }

  
  insertToResult(data) {

    return this.query("INSERT INTO  results SET ?", [data]);
  }
}
  module.exports = Results;
