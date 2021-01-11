const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const display2 = document.querySelector("#cc");
const display = document.querySelector("#time");
const myprog = document.getElementById("myProgress");
let pomodoro = 1500;
let isClicked = false;
let motiv = document.getElementById("motiveh");
let words;
function a() {
  myprog.onmouseover = () => {
    alert(
      "You can make a donation on my bitcoin wallet : bc1qjrprrxea8tzysj6m6jfvyyq5yu3mvgj3vuwfu8"
    );
  };
}
// function donate() {
//   setTimeout(a, 7000);
// }

function breake() {
  alert("Let's take a break");
}

window.onload = () => donate();

function fetchmotive() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      words = data;
      let ac = data.length - 1;
      motiv.innerHTML = words[Math.floor(Math.random() * ac)].text;
    });
}

function myPlay() {
  var audio = new Audio("./bell.mp3");
  audio.play();
}
let id;
let width = 0;
function move() {
  var elem = document.getElementById("myBar");
  width = 0;
  id = setInterval(frame, 1000);

  function frame() {
    if (width == 100) {
      clearInterval(id);
    } else {
      width = width + 0.066666667;
      elem.style.width = width + "%";
    }
  }
}

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  s = setInterval(run, 1000);
  function run() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display2.textContent = "My Pomodoro (" + minutes + " : " + seconds + ")";
    display.textContent = minutes + " : " + seconds;
    timer--;
    if (timer < 0) {
      breake();
      myPlay();
      isClicked = false;
      timer = pomodoro;
      clearInterval(s);
      fetchmotive();
      clearInterval(id);
      width = 0;
      function start() {
        if (!isClicked) {
          startTimer(pomodoro, display);
          isClicked = true;
          myPlay();
          move();
        }
      }
      startButton.onclick = () => start();
    }
  }

  function isClicked() {
    if (minutes != 25) {
      isClicked = true;
    }
  }

  resetButton.onclick = () => {
    if (isClicked) {
      clearInterval(id);
      var elem = document.getElementById("myBar");
      elem.style.width = 0 + "%";

      clearInterval(s);
      timer = pomodoro;
      function x() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display2.textContent =
          "My Pomodoro (" + minutes + " : " + seconds + ")";
        display.textContent = minutes + " : " + seconds;
      }
      x();
      isClicked = false;
      function start() {
        if (!isClicked) {
          startTimer(pomodoro, display);
          isClicked = true;
          myPlay();
          clearInterval(id);
          width = 0;
          move();
        }
      }
      startButton.onclick = () => start();
    }
  };
}

function start() {
  if (!isClicked) {
    clearInterval(id);
    width = 0;
    startTimer(pomodoro, display);
    isClicked = true;
    myPlay();
    fetchmotive();
    move();
  }
}

startButton.onclick = () => start();
