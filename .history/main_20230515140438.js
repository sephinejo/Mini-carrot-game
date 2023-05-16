'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 8;
const BUG_COUNT = 8;
const TIMER_MAX = 5;

const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector('.info__play');
const counter = document.querySelector('.info__counter');
const timerView = document.querySelector('.info__timer');

let started = false;
let score = 0;
let timer = undefined;

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

function stopGame() {
  stopGameTimer();
  showPopUp();
}

function showStopButton() {
  const icon = document.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showPlayButton() {
  const icon = document.querySelector('.fa-stop');
  icon.classList.add('fa-play');
  icon.classList.remove('fa-stop');
}

function showTimerAndCounter() {
  timerView.style.visibility = 'visible';
  counter.style.visibility = 'visible';
}

function showPopUp() {
  const popUp = document.querySelector('.pop-up');
  popUp.classList.remove('pop-up__hide');
}

function startGameTimer() {
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

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerView.innerText = `${minutes} : ${seconds}`;
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
