const Base = require("./base.model");
class Qoutes extends Base {

    findAll() {
        return this.query("SELECT * FROM qoutes_daily", []);
    }
    findTicker(tickerName) {
        return this.query("SELECT * FROM qoutes_daily." + tickerName +"", []);
    }
    insert(tickerName, data) {
        return this.query("INSERT INTO qoutes_daily." + tickerName + " SET?", [data]);
    }
    delete(tickerName, id) {
        return this.query("DELETE FROM qoutes_daily." + tickerName + " WHERE? ", [id]);
    }
    addNewColumn(tickerName, name) {
        return this.query("ALTER TABLE qoutes_daily." + tickerName + " ADD " + name + " varchar(255)");
    }
    
}


module.exports = Qoutes;
