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
  document.getElementById("namw").style.display = 'none';
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

var canvas = {
  element: document.getElementById("canvas"),
  width: screen.width,
  height: screen.height,
  initialize: function () {
    this.element.style.width = this.width;
    this.element.style.height = this.height;
    document.body.appendChild(this.element);
  },
};

var Ball = {
  create: function (color, dx, dy) {
    var newBall = Object.create(this);
    newBall.dx = dx;
    newBall.dy = dy;
    newBall.element = document.createElement("h1");
    newBall.element.innerHTML = "MADS";
    newBall.width = newBall.element.innerHTML.length*30;
    newBall.height = screen.height/6;
    newBall.element.style.fontFamily = "Teko, sans-serif";
    newBall.element.style.color = color;
    newBall.element.style.width = newBall.width + "px";
    newBall.element.style.height = newBall.height + "px";
    newBall.element.className += " ball";
    newBall.width = parseInt(newBall.element.style.width);
    newBall.height = parseInt(newBall.element.style.height);
    canvas.element.appendChild(newBall.element);
    return newBall;
  },
  moveTo: function (x, y) {
    this.element.style.left = x + "px";
    this.element.style.top = y + "px";
  },
  changeDirectionIfNecessary: function (x, y) {
    if (x < 0 || x > canvas.width - this.width) {
      this.dx = -this.dx;
    }
    if (y < 0 || y > canvas.height - this.height) {
      this.dy = -this.dy;
    }
  },
  draw: function (x, y) {
    this.moveTo(x, y);
    var ball = this;
    setTimeout(function () {
      ball.changeDirectionIfNecessary(x, y);
      ball.draw(x + ball.dx, y + ball.dy);
    }, 1000 / 60);
  },
};
canvas.initialize();
var ball1 = Ball.create("red", 4, 3);
// var ball2 = Ball.create("red", 1, 5);
// var ball3 = Ball.create("green", 2, 2);
// document.getElementById("ooop").innerHTML = "my text"
ball1.draw(0, 0);

// ball2.draw(20, 200);
// ball3.draw(300, 330);
