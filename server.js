
const express = require("express");

const controllers = require("./app/controllers");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static directory to be served
app.use(express.static("./app/public"));



// Routes
// =============================================================
app.use("/watchlist", controllers.watchList);
app.use("/results", controllers.results);
app.use("/elements", controllers.elements);
app.use("/qoutes", controllers.qoutes);



// Starts the server to begin listening
// =============================================================

app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });