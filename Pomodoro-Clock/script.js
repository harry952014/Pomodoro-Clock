$(document).ready(function() {
  var breakLength = 10,
    sessionLength = 25;
  var seconds = 60;
  var sInterval, bInterval;
  var sessionCount = parseInt($("sessionLength").html());
  var breakCount = parseInt($("breakLength").html());
  var buzzer = $("#buzzer")[0];

  function reset() {

    sessionCount = parseInt($("#sessionLength").html());
    sessionCount -= 1;
    breakCount = parseInt($("#breakLength").html());
    breakCount -= 1;
  }

  //Break Interval
  function decrementBreak() {

    if (breakCount < 0) {
      reset();
      $('#label').text("Session");
      $('#countDown').text(sessionCount + ":" + seconds);
      $('#clock').css("border-color", "green");
      clearInterval(bInterval);
      bInterval = 0;
      sInterval = setInterval(decrementSession, 100);
    } else {

      if (breakCount === 1) {
        breakCount = 0;
      }

      if (seconds === 0) {
        seconds = 60;
        breakCount -= 1;
      }
      seconds -= 1;

      if (seconds < 10 && breakCount >= 0) {
        $('#label').text("Break");
        $('#countDown').text(breakCount + ":0" + seconds);
      } else if (breakCount >= 0) {
        $('#label').text("Break");
        $('#countDown').text(breakCount + ":" + seconds);
      }
    }
  }

  //Session Interval
  function decrementSession() {

    if (sessionCount < 0) {

      buzzer.play();
      reset();
      $('#label').text("Break");
      $('#countDown').text(breakCount + ":" + seconds);
      $('#clock').css("border-color", "red");
      clearInterval(sInterval);
      sInterval = 0;
      bInterval = setInterval(decrementBreak, 100);

    }

    if (sessionCount === 1) {
      sessionCount = 0;
    }

    if (seconds === 0) {
      //clearInterval(interval);
      seconds = 60;
      sessionCount -= 1;
    }
    seconds -= 1;

    if (seconds < 10 && sessionCount >= 0) {
      $('#countDown').text(sessionCount + ":0" + seconds);
    } else if (sessionCount >= 0) {
      $('#countDown').text(sessionCount + ":" + seconds);
    }
  }

  $("#plusBr,#minusBr").on('click', function() {

    if (sInterval || bInterval) {
      return;
    }

    if (this.id === "plusBr") {
      $("#breakLength").text(++breakLength);

      if ($("#label").html() == "Break")
        $('#countDown').text(breakLength);

      reset();
    } else if (breakLength > 0) {
      $("#breakLength").text(--breakLength);

      if ($("#label").html() == "Break")
        $('#countDown').text(breakLength);
      reset();
    }

  });

  $("#plusSe,#minusSe").on('click', function() {

    if (sInterval || bInterval) {
      return;
    }

    if (this.id === "plusSe") {
      $("#sessionLength").text(++sessionLength);

      if ($("#label").html() == "Session")
        $('#countDown').text(sessionLength);
      reset();
    } else if (sessionLength > 0) {
      $("#sessionLength").text(--sessionLength);

      if ($("#label").html() == "Session")
        $('#countDown').text(sessionLength);
      reset();

    }

  });

  //Session start

  reset();

  $("#timer").on('click', function() {

      if (sInterval || bInterval) {
        clearInterval(sInterval);
        clearInterval(bInterval);

        sInterval = 0;
        bInterval = 0;

      }else{
    
        if ($("#label").html() == "Session")
          sInterval = setInterval(decrementSession, 100);
        else
          bInterval = setInterval(decrementBreak, 100);
      }
    

    
  });

});