var cell = document.getElementsByClassName("game-item"),
    reset = document.getElementById("game-reset"),
    message = document.getElementById("message"),
    stepCount = 0,
    winCombinations = [
        [1, 2, 3], [1, 4, 7], [1, 5, 9], [7, 8, 9],
        [2, 5, 8], [3, 6, 9], [3, 5, 7], [4, 5, 6]
    ],
    dataX = [],
    dataO = [];

class Player {
  constructor(name) {
    this.name = name;
  }
}

class Game {
  constructor() {
    this.playerX = new Player("X");
    this.playerO = new Player("O");
    this.currentPlayer = this.playerX.name;
  }

  play() {
    this.boundCurrentStep = this.currentStep.bind(this);
    for (var i = 0; i < cell.length; i++) {
      cell[i].addEventListener("click", this.boundCurrentStep);
    }
  }
  changePlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? "O" : "X";
  }


  checkWin(arr, number) {

    for (var w = 0, wLen = winCombinations.length; w < wLen; w++) {
      var someWinArr = winCombinations[w],
        count = 0;
      if (someWinArr.indexOf(number) !== -1) {
        for (var k = 0, kLen = someWinArr.length; k < kLen; k++) {
          if (arr.indexOf(someWinArr[k]) !== -1) {
            count++;
            if (count === 3) {
              return true;
            }
          }
        }
        count = 0;
      }
    }
  }
  currentStep(clickEvent) {
    var num = +clickEvent.target.getAttribute("data-cell");
    
    if (!clickEvent.target.textContent) {
      clickEvent.target.innerText = this.currentPlayer;

      this.currentPlayer === "X" ?
        dataX.push(num) && clickEvent.target.classList.add("x"):
        dataO.push(num) && clickEvent.target.classList.add("o");
      if (
        (dataO.length > 2 || dataX.length > 2) &&
        (this.checkWin(dataO, num) || this.checkWin(dataX, num))
      ) {
        for (var i = 0; i < cell.length; i++) {
          cell[i].removeEventListener("click", this.boundCurrentStep);
        }
        return (message.innerText = "Выиграл игрок " + this.currentPlayer);
      }

      this.changePlayer();
      stepCount++;
      (stepCount == 9) ? (message.innerText = 'Ничья') : (message.innerText = 'Ходит игрок ' + this.currentPlayer);
    }
  }
  reset() {
    reset.addEventListener("click", function() {
      for (var i = 0; i < cell.length; i++) {
        cell[i].innerText = "";
      }
      dataO = [];
      dataX = [];
      this.currentPlayer = "X";
      stepCount = 0;
      message.innerText = "Ходит игрок " + this.currentPlayer;
      for (var i = 0; i < cell.length; i++) {
        cell[i].classList.remove("x", "o");
         cell[i].addEventListener("click", this.boundCurrentStep);
      }
    }.bind(this));
  }
}


const game = new Game();
game.play();
game.reset();