const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect();

function initGame() {
  console.log(fieldRect);
  addItem('carrot', 5, 'img/carrot.png');
}

function addItem(className, count, imgPath) {}

initGame();
