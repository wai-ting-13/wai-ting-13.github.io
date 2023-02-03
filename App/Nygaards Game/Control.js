//1. Global variables

//1.1 HTML Element
var numButton = document.querySelectorAll("#keypad > tbody > tr > td");
var msgBox = document.querySelector("#msgBox");
var cells = document.querySelectorAll("#board > tr > td");

//1.2 Variable for game logic
var board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]
var a_move = [1, 3, 5, 7, 9];
var b_move = [2, 4, 6, 8];
var selectedValue = '';
var flag = 1


//2. function
function equals3(a, b, c) {
  let c0 = (a != '') && (b != '') && (c != ''); // problem
  let c1 = c0 && ((a % 2) == (b % 2) && (b % 2) == (c % 2));
  let c2 = c0 && (a + b + c == 15);
  return c1 || c2;
}

function checkWinner() {
  let winner = null;
  let players = { 1: "Player2", 0: "Player1" };
  //Horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {

      winner = players[flag % 2];
      return winner;
    }
  }

  //Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {

      winner = players[flag % 2];
      return winner;
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {

    winner = players[flag % 2];
    return winner;
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {

    winner = players[flag % 2];
    return winner;
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'Tie';
  } else {
    return winner;
  }
}

function mouseclickL() {
  if (selectedValue != '') {
    place(this, selectedValue)
  }
}

function place(element, number) {
  msgBox.innerText = "";
  selectedValue = '';

  let nodes = Array.prototype.slice.call(cells);
  let index = nodes.indexOf(element);
  let indexI = Math.floor(index / 3); let indexJ = index % 3;

  if (a_move.indexOf(number) > -1) {
    let indexK = a_move.indexOf(number)
    a_move.splice(indexK, 1);

  } else {
    let indexK = b_move.indexOf(number)
    b_move.splice(indexK, 1);
  }

  board[indexI][indexJ] = number;

  element.innerHTML = `<font color=${flag % 2 == 0 ? "DarkRed" : "RoyalBlue"}>` + number + "</font>" + "<sub>" + flag + "</sub>";
  flag++;
  element.removeEventListener("click", mouseclickL);
  numButton[number - 1].style.visibility = "hidden";

  let winner = checkWinner()
  if (winner == null) {

  }
  else if (winner != "Tie") {
    msgBox.innerText = winner + " wins";
    deSetup();
  }
  else {
    msgBox.innerText = "Tie";
    deSetup();
  }

}

//remove EventListener
function deSetup() {

  cells.forEach(c => {
    c.removeEventListener("click", mouseclickL);
  });

  document.getElementById("help").removeEventListener("click", AIMove);

}

function selectNum() {
  if (Number(this.innerText) % 2 == flag % 2) {
    msgBox.innerText = ""
    selectedValue = Number(this.innerText)
  }
  else {
    msgBox.innerText = "You Should not choose This"
  }

}



function setup() {
  //clear flag
  flag = 1;
  a_move = [1, 3, 5, 7, 9];
  b_move = [2, 4, 6, 8];

  //clear inner-board
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  //clear outer-board
  cells.forEach(c => {
    c.innerHTML = "";
  });

  //add EventListener
  cells.forEach(c => {
    c.addEventListener("click", mouseclickL);
  });

  document.getElementById("help").addEventListener("click", AIMove);

  //clear message
  msgBox.innerText = "";

  numButton.forEach(d => {
    d.addEventListener("click", selectNum);
    d.style.visibility = "visible";

  });

  let buttons = document.querySelectorAll("#keypad > tbody > tr > td > button")
  let buttonsArray = Array.prototype.slice.call(buttons);

  buttons.forEach(d => {
    //d.style.backgroundColor = buttonsArray.indexOf(d) % 2 == 0 ? "RoyalBlue" : "DarkRed";
  });

}

//Action
setup()
document.getElementById("Restart").addEventListener("click", setup);
document.querySelector("#guide > button").addEventListener("click", function(){document.querySelector("#guide").style.display="none"});

