'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 8;
const BUG_COUNT = 8;
const TIMER_MAX = 10;

const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector('.info__play');
const counter = document.querySelector('.info__counter');
const timerView = document.querySelector('.info__timer');
const popUp = document.querySelector('.pop-up');
const popUpReplayBtn = document.querySelector('.pop-up__replay');
const popUpMsg = document.querySelector('.pop-up__message');

const carrotSound = new Audio('');

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

popUpReplayBtn.addEventListener('click', replayGame);

field.addEventListener('click', onFieldClick);

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndCounter();
  startTimer();
}

function stopGame() {
  started = false;
  stopTimer();
  hidePlayBtn();
  showPopUpWithText('Replay?');
}

function replayGame() {
  started = true;
  hidePopUp();
  showPlayBtn();
  initGame();
  showTimerAndCounter();
  startTimer();
}

function finishGame(win) {
  started = false;
  hidePlayBtn();
  showPopUpWithText(win ? 'YOU WON 🥳' : 'YOU LOST 🐞');
}

function showStopBtn() {
  const icon = document.querySelector('#playIcon');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showPlayBtn() {
  playBtn.style.visibility = 'visible';
}

function hidePlayBtn() {
  playBtn.style.visibility = 'hidden';
}

function showTimerAndCounter() {
  timerView.style.visibility = 'visible';
  counter.style.visibility = 'visible';
}

function showPopUpWithText(text) {
  popUpMsg.innerText = text;
  popUp.classList.remove('pop-up__hide');
}

function hidePopUp() {
  popUp.classList.add('pop-up__hide');
}

function startTimer() {
  let remainingTime = TIMER_MAX;
  updateTimerText(remainingTime);
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTime);
  }, 1000);
}

function stopTimer() {
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

function onFieldClick(e) {
  if (!started) return;
  const target = e.target;
  if (target.matches('.carrot')) {
    target.remove();
    score++;
    updateScore();
    if (score === CARROT_COUNT) {
      stopTimer();
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    stopTimer();
    finishGame(false);
  }
}

function updateScore() {
  counter.innerText = CARROT_COUNT - score;
}
