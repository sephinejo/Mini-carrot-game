'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 8;
const BUG_COUNT = 8;
let TIMER_MAX = 5;

const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector('.info__play');
const counter = document.querySelector('.info__counter');
const timer = document.querySelector('.info__timer');
const popUp = document.querySelector('.pop-up');

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
  startGameTimer(TIMER_MAX);
}

function stopGame() {
  showPopUp();
}

function showPopUp() {
  popUp.classList.remove('pop-up__hide');
}

function showStopButton() {
  const icon = playBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showPlayButton() {
  const icon = playBtn.querySelector('.fa-stop');
  icon.classList.add('fa-play');
  icon.classList.remove('fa-stop');
  showPopUp();
}

function showTimerAndCounter() {
  timer.style.visibility = 'visible';
  counter.style.visibility = 'visible';
}

function startGameTimer(TIMER_MAX) {
  let remainingTime = TIMER_MAX;
  updateTimerText(remainingTime);
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTime);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timer.innerText = `${minutes} : ${seconds}`;
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
