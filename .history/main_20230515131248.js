'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 8;
const BUG_COUNT = 8;
let TIMER_MAX = 10;

const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector('.info__play');
const counter = document.querySelector('.info__counter');
const timer = document.querySelector('.info__timer');

let started = false;
let score = 0;
let timerRemembered = undefined;

playBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame();
  showStopButton();
  showTimerAndCounter();
  startGameTimer();
}

function stopGame() {}

function showStopButton() {
  const icon = playBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showTimerAndCounter() {
  timer.style.visibility = 'visible';
  counter.style.visibility = 'visible';
}

function startGameTimer(TIMER_MAX) {
  setTimeout(function () {
    let;
  });
}

function initGame() {
  field.innerHTML = '';
  counter.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 480;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.bottom - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
