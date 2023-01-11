let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let winMessage = document.getElementById("winMessage");
let totalSeconds = 0;
let interval = setInterval(setTime, 1000);

function setTime() {
  totalSeconds++;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  if (val < 10) {
    return "0" + val;
  } else {
    return val.toString();
  }
} 

let faces = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange"
]

let clone = faces.slice(0);
let cards = faces.concat(clone);

cards.sort(() => 0.5 - Math.random());

let board = document.getElementById("board");
let cardsChosen = [];
let cardsChosenId = [];
let guessedCards = [];
let allCards = [];

function createBoard() {
  for (let i = 0; i < cards.length; i++) {
    let card = document.createElement("div");
    card.setAttribute("card-id", i);
    card.style.width = "10vw";
    card.style.height = "10vw";
    card.style.backgroundImage= "linear-gradient(to bottom right, red, yellow)";
    card.addEventListener ("click", flipCard);
    board.appendChild(card);
    allCards.push(card);
  }
}

function checkForMatch() {
  if (cardsChosen[0] == cardsChosen[1]) {
    allCards[cardsChosenId[0]].style.background = "white";
    allCards[cardsChosenId[0]].style.border = "hidden";
    allCards[cardsChosenId[1]].style.background = "white";
    allCards[cardsChosenId[1]].style.border = "hidden";
    guessedCards.push(cardsChosen);

    if (guessedCards.length * 2 == cards.length) {
      clearInterval(interval);
      winMessage.innerHTML = "You win!";
    }
  } else {
    allCards[cardsChosenId[0]].style.backgroundImage= "linear-gradient(to bottom right, red, yellow)";
    allCards[cardsChosenId[1]].style.backgroundImage= "linear-gradient(to bottom right, red, yellow)";
    
  }
  cardsChosen = [];
  cardsChosenId = [];
}

function flipCard() {
  if (this.style.background !== "white") {
    let cardId = this.getAttribute("card-id");
    cardsChosen.push(cards[cardId])
    cardsChosenId.push(cardId);
    this.style.background = cards[cardId];
    if (cardsChosen.length == 2) {
      setTimeout(checkForMatch, 500);
    }
  }
}

createBoard()