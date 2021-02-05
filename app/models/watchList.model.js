const Base = require("./base.model");

class WatchList extends Base {

  findAll() {
    return this.query("SELECT * FROM  watchList ", []);
  }

  findRow(id) {
    return this.query("SELECT * FROM  watchList WHERE ID =" + id + "");
  }
  insertPassing(data) {

    return this.query("INSERT INTO watchlist SET ?", [data]);
  }
  deleteFromPassng(id) {
    return this.query(`DELETE FROM  watchList  WHERE  ID =${id};`);
  }
  addNewColumn(name) {
    return this.query("ALTER TABLE  watchList ADD" + name + " varchar(255)");
  }

  

}
module.exports = WatchList;



