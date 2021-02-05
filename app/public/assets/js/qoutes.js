// //this is js assocciated with qoutes.html

// $(document).ready(function () {

// const tickerArea = $("#Tickers");


// //=======Alert function
//       function displayMessage(type, message) {


//             if (type === "Error") {
//                   $("#Alert").html(`<div class="alert alert-danger" role="alert">
//                   ${type}: ${message} 
//                </div>`);

//                   setTimeout(function () { location.reload(); }, 1500);
//             } else {
//                   $("#Alert").html(`<div class="alert alert-success" role="alert">
//                   ${type}: ${message} 
//                </div>`);

//             }

//       };

//  //=======rendering data for input area
 
//  function renderTickers(tickerName){
//        return $(`
//           <option value=${tickerName.Ticker_name}>
             
//        `);
//  }


// // When the page loads, grab and display 5 of all tckers for search
// $.get("/watchlist/callTicker", (tickerName) => {  
//       console.log(tickerName)
      
//       tickerName.forEach(tickerName => {
//        tickerArea.prepend(renderTickers(tickerName));
//       })
//     });


// // When user clicks addBtn

//       $("#addTickerForFirstTime").on("click", (e) => {
//             e.preventDefault();

//             const callTicker = {
//                   callTicker: $("#TickerSelector").val()
//             };

//             const checkFields = async () => {
//                   if (callTicker.callTicker === "") { return false; }
//                   else { return true; };
//             };

//             checkFields(callTicker).then((check) => {
//                   if (check === false) { displayMessage("Error", "Select  one option") }
//                   else {

//                         $.post("/apiCall/firstCall", callTicker)
//                         displayMessage("success", "You called a new Ticker for first time");
//                         setTimeout(function () { location.reload(); }, 2000);

//                   };

//             });



//       });
// });      