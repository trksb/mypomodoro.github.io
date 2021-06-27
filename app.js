const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const display2 = document.querySelector("#cc");
const display = document.querySelector("#time");
const myprog = document.getElementById("myProgress");
let pomodoro = 1500;
let isClicked = false;
let motiv = document.getElementById("motiveh");
let words;

function breake() {
  alert("Let's take a break");
}

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

var tmads = {
  create: function (color, dx, dy) {
    var newname = Object.create(this);
    newname.dx = dx;
    newname.dy = dy;
    newname.element = document.createElement("h1");
    newname.element.innerHTML = "U CAN";
    newname.width = newname.element.innerHTML.length*30;
    newname.height = screen.height/6;
    newname.element.style.fontFamily = "Teko, sans-serif";
    newname.element.style.color = color;
    newname.element.style.width = newname.width + "px";
    newname.element.style.height = newname.height + "px";
    newname.element.className += " name";
    newname.width = parseInt(newname.element.style.width);
    newname.height = parseInt(newname.element.style.height);
    canvas.element.appendChild(newname.element);
    return newname;
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
    var name = this;
    setTimeout(function () {
      name.changeDirectionIfNecessary(x, y);
      name.draw(x + name.dx, y + name.dy);
    }, 1000 / 60);
  },
};
canvas.initialize();
var name1 = tmads.create("red", 4, 3);
name1.draw(0, 0);
