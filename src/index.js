import "./styles.css";
import { pointsAlongLine } from "./vector.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const canvasBg = document.getElementById("canvasBg");
const ctxBg = canvasBg.getContext("2d");

// let pixelRatio = 2;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvasBg.width = window.innerWidth;
canvasBg.height = window.innerHeight;

ctx.fillStyle = "rgb(255, 252, 243)";
ctx.strokeStyle = "#FFA07A";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

let last_x = 0;
let last_y = 0;
// let savedImageData = [];

let penDown = false;
let buttonState = 0;
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let clearbtn = document.getElementById("clear");
// let save = document.getElementById("save");
let restore = document.getElementById("restore");
let lemon = document.getElementById("lemon");
let cherry = document.getElementById("cherry");
let peach = document.getElementById("peach");
let pear = document.getElementById("pear");
let strawberry = document.getElementById("strawberry");

let bg01 = new Image();
bg01.crossOrigin = "anonymous";
bg01.src = "assets/lemon.jpg";
lemon.addEventListener("click", showBg01);

let bg02 = new Image();
bg02.crossOrigin = "anonymous";
bg02.src = "assets/cherry.jpg";
cherry.addEventListener("click", showBg02);

let bg03 = new Image();
bg03.crossOrigin = "anonymous";
bg03.src = "assets/peach.jpg";
peach.addEventListener("click", showBg03);

let bg04 = new Image();
bg04.crossOrigin = "anonymous";
bg04.src = "assets/pear.jpg";
pear.addEventListener("click", showBg04);

let bg05 = new Image();
bg05.crossOrigin = "anonymous";
bg05.src = "assets/strawberry.jpg";
strawberry.addEventListener("click", showBg05);

let currentBg = bg01;

function showBg01() {
  currentBg = bg01;
  renderBg();
}

function showBg02() {
  currentBg = bg02;
  renderBg();
}

function showBg03() {
  currentBg = bg03;
  renderBg();
}

function showBg04() {
  currentBg = bg04;
  renderBg();
}

function showBg05() {
  currentBg = bg05;
  renderBg();
}

function renderBg() {
  ctxBg.clearRect(0, 0, canvasBg.width, canvasBg.height);
  // ctxBg.drawImage(currentBg, 0, (canvasBg.height-canvasBg.width/(3/4))*-0.5, canvasBg.width, canvasBg.width*3/4);
  ctxBg.drawImage(
    currentBg,
    (canvasBg.width - canvasBg.height / (3 / 4)) * 0.5,
    0,
    canvasBg.height / (3 / 4),
    canvasBg.height
  );
}

// let lemon = new Image();
// lemon.src = "assets/lemon.jpg";
// lemon.onload = render;

// function render() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.drawImage(lemon, 0, 0, canvas.width, canvas.height);
// }

let undoStack = [];
pushState();

function pushState() {
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  console.log(undoStack.length);
}

restore.addEventListener("click", function () {
  if (undoStack.length > 1) {
    undoStack.pop();
  }
  let lastElement = undoStack[undoStack.length - 1];
  if (lastElement) {
    ctx.putImageData(lastElement, 0, 0);
  }
  console.log(undoStack.length);
});

function norm_random(size) {
  return (Math.random() - 0.5) * size;
}

function paintStart(x, y) {
  penDown = true;
  last_x = x;
  last_y = y;
}

function paintMove(x, y) {
  // ctx.beginPath();
  // ctx.strokeStyle = `hsl(${Math.random() * 200},90%,60%,0.6)`;
  // // ctx.strokeStyle = "	#FA8072";
  // ctx.lineWidth = 3;
  // ctx.moveTo(last_x, last_y);
  // ctx.lineTo(x, y);
  // ctx.moveTo(last_x, last_y);
  // ctx.lineTo((x + last_x) / 5, last_y - y / 3);
  // ctx.stroke();

  // last_x = x;
  // last_y = y;

  //MINE
  ctx.beginPath();

  ctx.lineWidth = 1;
  ctx.moveTo(last_x, last_y);
  ctx.arc(x, y, 2, 0, Math.PI * 2);
  ctx.lineTo(x, y);

  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = `hsl(${Math.random() * 360},90%,60%)`;
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
  last_x = x;
  last_y = y;
}

function paintMove2(x, y) {
  ctx.beginPath();
  // ctx.strokeStyle = `hsl(${Math.random() * 200},90%,60%)`;
  // ctx.fillStyle = `hsl(${Math.random()*360},%90,%60)`;;
  let thickness = 2;
  ctx.lineWidth = thickness;
  ctx.moveTo(last_x, last_y);
  ctx.stroke();

  let randomness = 40;

  for (var i = 0; i < 10; i++) {
    ctx.fillStlye = `hsl(${Math.random() * 360},%90,%60)`;
    ctx.arc(
      x + norm_random(randomness),
      y + norm_random(randomness),
      1,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  ctx.fill();
  last_x = x;
  last_y = y;
}

function paintMove3(x, y) {
  ctx.beginPath();
  ctx.strokeStyle = "#FFA07A";
  // let thickness = 1;
  ctx.lineWidth = 1;
  ctx.moveTo(last_x, last_y);

  let interpolatedPoints = pointsAlongLine(x, y, last_x, last_y, 1);
  console.log(interpolatedPoints);
  let randomness = 90;
  let thickness=2
  ctx.lineWidth = thickness;

  interpolatedPoints.forEach(function (p) {
    ctx.fillStyle = `hsl(${Math.random() * 360},90%,60%)`;
    ctx.beginPath();
    ctx.fillRect(
      Math.floor(p.x) + norm_random(randomness),
      Math.floor(p.y) + norm_random(randomness),
      Math.random() * 2,
      Math.random() * 3
      // 0,
      // Math.PI * 2
    );
    // ctx.stroke();
    ctx.fill();
  });

  last_x = x;
  last_y = y;
}

function paintEnd(x, y) {
  pushState();
}

canvas.addEventListener("mousedown", function (evt) {
  let x = evt.clientX;
  let y = evt.clientY;
  paintStart(x, y);
});

canvas.addEventListener("touchstart", function (evt) {
  let touches = Array.from(evt.touches);
  let touch = touches[0];

  let x = touch.clientX;
  let y = touch.clientY;

  last_x = x;
  last_y = y;
});

canvas.addEventListener("touchmove", function (evt) {
  evt.preventDefault();
  let touches = Array.from(evt.touches);
  let touch = touches[0];

  penDown = true;
  let x = touch.clientX;
  let y = touch.clientY;

  if (buttonState === 1) {
    paintMove(x, y);
  } else if (buttonState === 2) {
    paintMove2(x, y);
  } else if (buttonState === 3) {
    paintMove3(x, y);
  }
});

canvas.addEventListener("mousemove", function (evt) {
  if (penDown === false) {
    return;
  }
  let x = evt.clientX;
  let y = evt.clientY;
  if (buttonState === 1) {
    paintMove(x, y);
  } else if (buttonState === 2) {
    paintMove2(x, y);
  } else if (buttonState === 3) {
    paintMove3(x, y);
  }
});

canvas.addEventListener("mouseup", function (evt) {
  penDown = false;
  let x = last_x;
  let y = last_y;
  paintEnd(x, y);
});

canvas.addEventListener("mouseout", function (evt) {
  penDown = false;
});

button1.addEventListener("click", function () {
  if (buttonState === 1) {
    buttonState = 0;
  } else {
    buttonState = 1;
  }
});

button2.addEventListener("click", function () {
  if (buttonState === 2) {
    buttonState = 0;
  } else {
    buttonState = 2;
  }
});

button3.addEventListener("click", function () {
  if (buttonState === 3) {
    buttonState = 0;
  } else {
    buttonState = 3;
  }
});

clearbtn.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
