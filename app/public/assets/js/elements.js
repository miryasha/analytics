$(document).ready(function(){


     //Alert Func
      function displayMessage(type, message) {


            if (type === "Error") {
                  $("#Alert").html(`<div class="alert alert-danger" role="alert">
                  ${type}: ${message} 
               </div>`);
               
               setTimeout(function(){ location.reload(); }, 1500);
            } else {
                  $("#Alert").html(`<div class="alert alert-success" role="alert">
                  ${type}: ${message} 
               </div>`);
              
            }

      };


///===Stategy line
$('#addStrategy').on("click",  (event) =>{
      event.preventDefault();
     
      const Strategy_name =  { Strategy_name : $('#inputStrategy').val().trim()};
      const checkFields = async () => { 
            if (Strategy_name.Strategy_name === "") { return false;}
            else { return true; };  
            };    
            
        checkFields(Strategy_name).then((check)=>{
              if (check === false){ displayMessage("Error", "Field cannot be blank")}
              else { 
              
              $.post("/elements/addStrategy", Strategy_name ) 
              displayMessage("success", "Strategy Added");
              setTimeout(function(){ location.reload(); }, 2000);
             
            };
              
        });


});

///====== time frame line

$('#addTimeFrame').on("click", (event) =>{
      event.preventDefault();
      
      const Time_frame =  { Time_frame: $('#inputTimeFrame').val().trim()};
      const checkFields = async () => { 
            if (Time_frame.Time_frame === "") { return false }
            else { return true };  
            };    
           
        checkFields(Time_frame).then((check)=>{
              if (check === false){ displayMessage("Error", "Name cannot be blank")}
              else { 
              
              $.post("/elements/addTimeFrame", Time_frame ) 
              displayMessage("success", "Time Frame Added");
              setTimeout(function(){ location.reload(); }, 2000);
              
            };
              
        });


});



///======ticker
$('#addTicker').on("click", (event) =>{
      event.preventDefault();
      
      const ticker =  { 
            name: $('#inputTickerName').val().trim(),
            description: $('#inputTickerDescription').val().trim(),
            market: $('#inputmarket').val().trim()
      };
      const checkFields = async () => { 
            if (ticker.name === "") { return false}
            else if (ticker.description === "") { return false}
            else if (ticker.market === "") { return false}
            else { return true };  
            };    
            

        checkFields(ticker).then((check)=>{
              if (check === false){ displayMessage("Error", "Field cannot be blank")}
              else { 
              
              $.post("/elements/addTicker", ticker ) 
              displayMessage("success", "Ticker Added");
              setTimeout(function(){ location.reload(); }, 2000);
              
            };
              
        });


});


$('#ClearStrategy').on("click", (event) =>{
      event.preventDefault(event);
      $('#inputStrategy').val("");
});

$('#ClearTimeFrame').on("click", (event) =>{
      event.preventDefault(event);
      $('#inputTimeFrame').val("");
});

$('#ClearTicker').on("click", (event) =>{
      event.preventDefault(event);
      $('#inputTickerName').val("");
      $('#inputTickerDescription').val("");
      $('#inputmarket').val("");


});

});