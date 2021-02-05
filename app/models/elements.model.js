const Base = require("./base.model");
class Elements extends Base {
    
      
    findAllTickers(){
        return this.query("SELECT * FROM ticker_name", []);
    }
    findAllStrategies(){
      return this.query("SELECT * FROM Strategies", []);
    }
    findAllTimeFrames(){
      return this.query("SELECT * FROM time_frame", []);
    }

    insertStrategy(data){
        return this.query("INSERT INTO Strategies SET?", [data]);
     }

     insertTime_frame(data){
      return this.query("INSERT INTO time_frame SET?", [data]);
     }

     insertTicker_name(data){
    return this.query("INSERT INTO ticker_name SET?", [data]);
     }

     delete(tbl,id){
         return this.query("DELETE FROM "+ tbl +" WHERE? ", [id]);
     }
     
  }
  module.exports = Elements;
      

