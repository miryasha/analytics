
class TimeData {

      async nameOfDay (date) {
            let date_ob = await new Date(date);//mm/dd/yyyy
            let days =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let nameOfDay = await days[date_ob.getDay()];
           return this.nameOfDay();
                       
      }
      async nameOfMonth (date){
            let date_ob = await new Date(date);//mm/dd/yyyy
            let months = await ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let nameOfMonth = await months[date_ob.getMonth()];
            return nameOfMonth;
      }
      async fullYear (date){
            let date_ob = await new Date(date);//mm/dd/yyyy
            let year = await date_ob.getFullYear();
            return year;
      }

      async daysDifferent(startDay, endDay) {

            let dateFirst = await new Date(startDay);
             let dateSecond = await new Date(endDay);
            // time difference
            let timeDiff = await Math.abs(dateSecond.getTime() - dateFirst.getTime());
            // days difference
            let daysDifferent = await Math.ceil(timeDiff / (1000 * 3600 * 24));

            return daysDifferent;

      }



}

module.exports = TimeData