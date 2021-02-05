const Base = require("./base.model");
class ApiCall extends Base {

    findAllStock() {
        return this.query("SELECT * FROM list_calling_stock;");
    }

    
    findAllForex() {
        return this.query("SELECT * FROM list_calling_forex;");
    }
    
    insert(data) {
        return this.query("INSERT INTO qoutes_daily SET?", [data]);
    }

        
    
    insertStockTable(tickerName){
        return this.query("INSERT INTO list_calling_stock  SET?", [tickerName]);
    }

    insertForexTable(tickerName){
        return this.query("INSERT INTO list_calling_forex  SET?", [tickerName]);
    }

    
    
}

module.exports = ApiCall;
