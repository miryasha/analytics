

$(document).ready(function () {

      const watchListArea = $("#pendingList");
      const tickerArea = $("#Tickers");
      const strategyArea = $("#Strategies");
      const timeFrameArea = $("#TimeFrames");



      //=======Alert function    
      function displayMessage(type, message) {
            if (type === "Error") {
                  $("#Alert").html(`<div class="alert alert-danger" role="alert">
                  ${type}: ${message} 
               </div>`);
                  setTimeout(function () { location.reload(); }, 1500);
            } else {
                  $("#Alert").html(`<div class="alert alert-success" role="alert">
                  ${type}: ${message} 
               </div>`);


            }

      };



      ///=================================
      //=======rendering data for Tikers

      function renderTickers(tickerName, market) {
            return $(`
         <option value=${tickerName}_${market}>
         `);
      };



      // When the page loads, grab and display Tikers
      $.get("/watchlist/callTicker", (tickerName) => {

            tickerName.forEach(tickerName => {
                  tickerArea.prepend(renderTickers(tickerName.Ticker_name, tickerName.Ticker_market));
                  
            })
      });


      ///=================================
      //=======rendering data for Strategies

      function renderStrategies(strategyName) {
            return $(`
         <option value=${strategyName}>
         `);
      };



      // When the page loads, grab and display Strategies
      $.get("/watchlist/callstrategy", (strategyName) => {

            strategyName.forEach(strategyName => {
                  strategyArea.prepend(renderStrategies(strategyName.Strategy_name));
            })
      });

      ///=================================

      ///=================================
      //=======rendering data for Strategies

      function renderTimeFrames(timeFrame) {
            return $(`
         <option value=${timeFrame}>
         `);
      };



      // When the page loads, grab and display Strategies
      $.get("/watchlist/callTimeFrame", (timeFrame) => {

            timeFrame.forEach(timeFrame => {
                  timeFrameArea.prepend(renderTimeFrames(timeFrame.Time_frame));
            })
      });




      ///=================================

      //=======rendering all watchListArea

      const renderWatchlist = (props) => {

      return $(`
      
      <tr class="" id="rowPendingList" >   
      <th scope="row" class="classListId" id="listId">${props.ID}</th>
      <td id="listTicker">${props.ticker}</td>
      <td id="listMarket">${props.market}</td>
      <td id="listStrategy">${props.strategy}</td>
      <td id="listMarketTrend">${props.marketTrend}</td>
      <td id="listTimeFrame">${props.timeFrame}</td>
      <td id="listStartingDate">${props.startingDate}</td>
      <td id="listDurationWD">${props.durationWD}</td>
      <td> <button type="button" class="btn btn-danger Delete" id="deleteFromPending">Delete</button></td>
      <td> <button type="button" class="btn btn-success Add"  >Add</button></td>
      </tr>
         `);

      };



      // When the page loads, grab and display watchlist
      $.get("/watchlist/callwatchlist", (watchlist) => {

            watchlist.forEach(watchlist => {
                 watchListArea.prepend(renderWatchlist(watchlist));
            })
      });


      //==================
      //when submit Btn 

      const submitBtn = $('#SubmitBtn').on("click", (event) => {

            event.preventDefault();

            ///make watchlist object
            const watchlist = {
                  tickerMarket: $("#TickerSelector").val().trim(),
                  strategy: $("#StrategySelector").val().trim(),
                  marketTrend: $("#MarketTrendSelector").val().trim(),
                  timeFrame: $("#TimeFrameSelector").val().trim(),
                  startingDate: $("#inputStartingDate").val().trim(),
                  durationWD  : $("#inputDuration").val().trim()

            };
                 

            const checkFields = async (watchlist) => {
                  if (watchlist.tickerMarket === "") {
                        return false;
                  }  else if (watchlist.strategy === "") {
                        return false;
                  } else if (watchlist.marketTrend === "") {
                        return false;
                  } else if (watchlist.timeFrame === "") {
                        return false;
                  } else if (watchlist.startingDate === "") {
                        return false;
                  } else if (watchlist.durationWD === "") {
                        return false;
                  } else {
                        return true

                  };
            };


            checkFields(watchlist).then((check) => {
                  if (check === false) { displayMessage("Error", "Field cannot be blank") }
                  else {
                      
                        $.post("/watchlist/add", watchlist)
                        displayMessage("success", "Registered successfully");
                        setTimeout(function () { location.reload(); }, 2000);

                  };

            });

      });





      ///when cler btn 

      const clearBtn = $('#ClearBtn')
            .on("click", (event) => {
                  event.preventDefault();
                        $("#TickerSelector").val(""),
                        $("#StrategySelector").val(""),
                        $("#MarketTrendSelector").val(""),
                        $("#TimeFrameSelector").val(""),
                        $("#inputStartingDate").val(""),
                        $("#inputEndingDate").val("")

            });





      //==when Add Btn inside the pendind hic
      $("#pendingList")
            .on('click', (event) => {

                  if (event.target.classList.contains('Add')) {                         

                        const rowData = { id: event.target.parentElement.parentElement.querySelector("#listId").innerText,
                                          ticker: event.target.parentElement.parentElement.querySelector("#listTicker").innerText,
                                          duration: event.target.parentElement.parentElement.querySelector("#listDurationWD").innerText
                                        };                                    
                                        
                       $.post("/results/add", rowData)
                       const delay = parseInt(rowData.duration.split(",").length) ;
                       const reloadPage = (delay + 1) * 5000
                       displayMessage("success", "Watchlist has sent to Results");
                       setTimeout(function () { location.reload(); }, reloadPage);
                  }


            });



      //==when delete Btn inside the pendind hic
      $("#pendingList")
            .on('click', (event) => {
                         console.log(event)   
                  if (event.target.classList.contains('Delete')) {                         
 
                        const rowData = { id: event.target.parentElement.parentElement.querySelector("#listId").innerText};
                          
                        $.post("/watchlist/delete", rowData)
                        displayMessage("success", "Watchlist has Deleted");
                        setTimeout(function () { location.reload(); }, 2000);
                  }

            });






});




