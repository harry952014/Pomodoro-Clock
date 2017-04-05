$(document).ready(function() {

  var lat;
  var lon;
  var weatherApi = "";

  var geoApi = "http://ip-api.com/json";

  $.getJSON(geoApi, function(data) {

      lat = data.lat;
      lon = data.lon;

      weatherApi = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=dbf60e578e158c4190be5137e456f27b";
    
    var forecastApi = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=dbf60e578e158c4190be5137e456f27b";
    
      $("#city").html(data.city + ", " + data.country);

      $.getJSON(weatherApi, function(data2) {

        var kTemp = Math.round(data2.main.temp);
        var cTemp = Math.round(kTemp - 273.15);
        var fTemp = toFahr(cTemp);
        var tempSwap = true;
        var unit = 'C';
        var weatherType = data2.weather[0].description;
        var weatherIcon = data2.weather[0].icon;
        var cTempHigh = Math.round(data2.main.temp_max - 273.15);
        var cTempLow = Math.round(data2.main.temp_min - 273.15);
        var fTempHigh = toFahr(cTempHigh);
        var fTempLow = toFahr(cTempLow);
        
      function toFahr(celcius){
          
          return Math.round(celcius * 9 / 5 + 32);
        };

        $("#weatherIcon").attr("src", "http://openweathermap.org/img/w/" + weatherIcon + ".png")
        $("#weatherIcon").removeClass("hide");
        $("#weatherType").html(weatherType);
        $("#temp").html(fTemp + "&#176; <a>F</a>");
        $(".glyphicon-arrow-up").html(" " + fTempHigh + "&#176;" + unit);
        $(".glyphicon-arrow-down").html(" " + fTempLow + "&#176;"  + unit );
        
        $("#temp").on("click", function() {

          if (tempSwap) {
            unit = "C";
            $("#temp").html(cTemp + "&#176; <a>" + unit + "</a>");
            $(".glyphicon-arrow-up").html(" " +cTempHigh + "&#176;" + unit);
            $(".glyphicon-arrow-down").html(" " +cTempLow + "&#176;" + unit);
            tempSwap = false;
          } else {
            unit = "F";
            $("#temp").html(fTemp + "&#176;" + unit);
            $(".glyphicon-arrow-up").html(" " + fTempHigh + "&#176;" + unit);
            $(".glyphicon-arrow-down").html(" " + fTempLow + "&#176;"  + unit );
            tempSwap = true;
          }
        })

      }).fail(function(d, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: " + error)
      });
    /*
    $.getJSON(forecastApi, function(data3){
      
      function kelToFahr(kelvin){
         return Math.round((kelvin - 273.15) * 9 / 5 + 32);
      }
      
      for(var i=0; i<data3.list.length; i++){
        
        console.log(data3.list[i].dt_txt);
        if(data3.list[i].dt_txt.slice(-8)==='00:00:00'){
          
          for(var j=i; j<=8; j++){
            
            $("#time").append("<th>"+ data3.list[j].dt_txt.slice(10,-3) + "</th")
          }
          break;
         // $("#forecast").append("<br><br><span id='tempForecast'>"+ kelToFahr(data3.list[i].main.temp) + "&#176;F" + "</span>   ");
         
     
        //}else{
         // $("#forecast").append(data3.list[i].dt_txt.slice(-8,-3) + "   ") ; 
         // $("#forecast").append("<span id='tempForecast'> " + kelToFahr(data3.list[i].main.temp)+ "&#176;F" + "</span>    ");
        }
      }
      
    });
    */
    }

  );

});