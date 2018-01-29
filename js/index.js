var breakLength;
var sessionLength;
var totalSecs;
var remainingSecs;
var minutes;
var seconds;
var timer;
var isBreak;

function breakMinus() {
  breakLength = parseInt(document.getElementById("break").innerHTML);
  if (breakLength > 0)
    breakLength = breakLength - 1;
  document.getElementById("break").innerHTML = "" + breakLength;
};

function breakPlus() {
  breakLength = parseInt(document.getElementById("break").innerHTML);
  if (breakLength > 0)
    breakLength = breakLength + 1;
  document.getElementById("break").innerHTML = "" + breakLength;
};

function sessionMinus() {
  sessionLength = parseInt(document.getElementById("session").innerHTML);
  if (sessionLength > 0)
    sessionLength = sessionLength - 1;
  document.getElementById("session").innerHTML = "" + sessionLength;
};

function sessionPlus() {
  sessionLength = parseInt(document.getElementById("session").innerHTML);
  if (sessionLength > 0)
    sessionLength = sessionLength + 1;
  document.getElementById("session").innerHTML = "" + sessionLength;
};

jQuery(document).ready(function($) {
  // alert("dom is ready");
  isBreak = false;
  breakLength = document.getElementById('break').innerHTML;
  sessionLength = document.getElementById('session').innerHTML;
});

function setSessionOrBreak() {
  if (!isBreak) {
    minutes = sessionLength;
    totalSecs = sessionLength * 60;
    document.getElementById("status").innerHTML = "Session";
  } else {
    minutes = breakLength;
    totalSecs = breakLength * 60;
    document.getElementById("status").innerHTML = "Break";
  }
}

// start the timer
function timerGo() {

  // set the buttons to 'pause'
  document.getElementById("goButton").style.display = "none";
  document.getElementById("pauseButton").style.display = "inline-block";
  document.getElementById("resetButton").style.display = "none";

  if (seconds > 0 || minutes > 0) {

  } else {

    // reset pie chart
    document.getElementById("circle").style.backgroundImage = "linear-gradient(90deg, transparent 50%, black 50%),linear-gradient(90deg, black 50%, transparent 50%)";

    // set the timer variables
    setSessionOrBreak();

    remainingSecs = 0;
    seconds = 0;
    if (seconds < 10)
      document.getElementById("time").innerHTML = minutes + ":0" + seconds;
    else
      document.getElementById("time").innerHTML = minutes + ":" + seconds;
  }
  // set the timer to go 1000 = 1 second
  timer = setInterval(myTimer, 100);
};

function timerReset() {

    isBreak = false;
    clearTimeout(timer);

    // set the buttons to 'pause'
    document.getElementById("goButton").style.display = "none";
    document.getElementById("pauseButton").style.display = "inline-block";
    document.getElementById("resetButton").style.display = "none";

    // reset pie chart
    document.getElementById("circle").style.backgroundImage = "linear-gradient(90deg, transparent 50%, black 50%),linear-gradient(90deg, black 50%, transparent 50%)";

    // set the timer variables
    setSessionOrBreak();

    remainingSecs = 0;
    seconds = 0;
    if (seconds < 10)
      document.getElementById("time").innerHTML = minutes + ":0" + seconds;
    else
      document.getElementById("time").innerHTML = minutes + ":" + seconds;

  // set the timer to go 1000 = 1 second
  timer = setInterval(myTimer, 100);

};

function timerPause() {
  document.getElementById("goButton").style.display = "inline-block";
  document.getElementById("pauseButton").style.display = "none";
  document.getElementById("resetButton").style.display = "inline-block";

  clearTimeout(timer);
};

function myTimer() {

  remainingSecs = remainingSecs + 1;
  var percent = (remainingSecs / totalSecs);

  if (parseInt(seconds) === 0) {
    seconds = 59;
    minutes = minutes - 1;
  } else
    seconds = seconds - 1;

  if (seconds < 10)
    document.getElementById("time").innerHTML = minutes + ":0" + seconds;
  else
    document.getElementById("time").innerHTML = minutes + ":" + seconds;

  document.getElementById("percentage").innerHTML = (percent.toFixed(2)*100).toFixed(0) + "%";

  if (percent <= 0.5) {
    var valPercent = 90 + (360 * percent);
    document.getElementById("circle").style.backgroundImage = "linear-gradient(" + valPercent + "deg, transparent 50%, black 50%),linear-gradient(90deg, black 50%, transparent 50%)";
  } else if (percent > 0.5 && percent <= 1.0) {
    var valPercent = (360 * percent) - 90;
    //alert(valPercent);
    document.getElementById("circle").style.backgroundImage = "linear-gradient(90deg, transparent 50%, #ffff33 50%),linear-gradient(" + valPercent + "deg, black 50%, transparent 50%)";
  }

  if (percent === 1) {
    beep();
    // swtich to other  
    clearTimeout(timer);
    if (isBreak) {
      isBreak = false;
      document.getElementById("status").innerHTML = "Session";
    } else {
      isBreak = true;
      document.getElementById("status").innerHTML = "Break";
    }
    isRunning = false;
    timerGo();
  }

}

function beep() {
  var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
  snd.play();
};