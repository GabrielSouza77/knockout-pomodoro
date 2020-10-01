function CounterViewModel() {
    var self = this;
    self.minutes = ko.observable(25);
    self.seconds = ko.observable("00");
    self.phrase = ko.observable();
    
    self.start = function() {
      self.minutes(24)
      self.seconds('59');

      var currentMinute = self.minutes(); 
      var currentSecond = self.seconds();

      var minutesInterval = setInterval(() => {
         currentMinute = currentMinute - 1;
         self.minutes(currentMinute);
         if (currentMinute <= 9) self.minutes("0" + currentMinute);
      }, 60000);

      var secondsInterval = setInterval(() => {
         currentSecond = currentSecond - 1;
         self.seconds(currentSecond);
         if (currentSecond <= 0) {
            currentSecond = "60";
            self.seconds("00");
         }
         if (currentSecond <= 9) self.seconds("0" + currentSecond);

         if (currentSecond <= 0) {
            if (currentMinute <= 0){
               clearInterval(minutesInterval);
               clearInterval(secondsInterval);
               self.minutes(25);
               self.seconds('00');
               self.phrase('Time for a break, champ!');
            }
         }
      }, 1000);     
   }

   self.stop = function() {
   } 
}
 const knockoutApp = document.querySelector("#knockout-app");
 ko.applyBindings(new CounterViewModel(), knockoutApp);