const connection = require('../cofig/dbConnection');
//const connectionQoutes = require('../cofig/dbqoute.connection');

const Quotes = require('./quotes.model');
const Elements = require('./elements.model');
const WatchList = require('./watchList.model');
const Results = require('./results.model');
const ApiCall = require('./apiCall.model');

module.exports = {
  quotes: new Quotes(connection),
  elements: new Elements(connection),
  WatchList : new WatchList(connection),
  Results : new Results(connection),
  apiCall : new ApiCall(connection)

  }