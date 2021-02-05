$(document).ready(function () {

const resultsArea = $("#results"); 


 //=======rendering data for results

 function renderStrategies(results){
      return $(`
         <h1>${results.Symbol}</h1>
         <h1>${results.date}</h1>
         <h1>${results.Open}</h1>
         <h1>${results.High}</h1>
         <h1>${results.Low}</h1>
         <h1>${results.Close}</h1>
         <h1>${results.Volume}</h1>
         
         `);
  };
   


// When the page loads, grab and display Strategies
      $.get("/results/callqoutes", (results) => {

       results.forEach(results => {
                 
           resultsArea.prepend(renderStrategies(results));
        })


      });

///=================================




});