//Think
function AIMove() {
  ifFirstPlayer = (flag % 2 != 0);
  let action = ifFirstPlayer ? a_move : b_move;
  let move;
  let alpha = -Infinity;
  let beta = Infinity;

  // AI to make its turn
  //Find best score
  if (ifFirstPlayer) {

    let bestScore = -Infinity;
    for (let k = 0; k < 9; k++) {
      for (let l = 0; l < action.length; l++) {
        // Is the spot available?
        let i = Math.floor(k / 3);
        let j = k % 3;
        let score;
        if (board[i][j] == '') {
          let a = action[0];
          action.shift();
          board[i][j] = a;
          flag++;
          score = minimax(board, alpha, beta, false);
          board[i][j] = '';
          flag--;
          action.push(a)
          if (score > bestScore) {
            bestScore = score;
            move = { a, i, j };
          }
          alpha = (alpha < score) ? score : alpha;
        }

      }
      if (alpha >= beta) { break; }
    }
  } else {

    let bestScore = Infinity;
    for (let k = 0; k < 9; k++) {
      for (let l = 0; l < action.length; l++) {
        // Is the spot available?
        let i = Math.floor(k / 3);
        let j = k % 3;
        let score;
        if (board[i][j] == '') {
          let a = action[0];
          action.shift();
          board[i][j] = a;
          flag++;
          score = minimax(board, alpha, beta, true);
          board[i][j] = '';
          flag--;
          action.push(a)
          if (score < bestScore) {
            bestScore = score;
            move = { a, i, j };
          }
          beta = (beta < score) ? beta : score;
        }
      }
      if (alpha >= beta) { break; }
    }
  }

  if (move != null) {
    place(cells[3 * move.i + move.j], move.a);
  }


}



//Thinking of AI
function minimax(board, alpha, beta, isMaximizing) {

  let scores = { "Player1": 10, "Player2": -10, "Tie": 0 };
  let result = checkWinner();
  if (result != null) {
    return scores[result];
  }


  //Find best score
  if (isMaximizing) {
    let action = a_move;
    let bestScore = -Infinity;
    for (let k = 0; k < 9; k++) {
      for (let l = 0; l < action.length; l++) {
        // Is the spot available?
        let i = Math.floor(k / 3);
        let j = k % 3;
        let score;
        if (board[i][j] == '') {
          let a = action[0];
          action.shift();
          board[i][j] = a;
          flag++;
          score = minimax(board, alpha, beta, false);
          board[i][j] = '';
          flag--;
          action.push(a)
          if (score > bestScore) {
            bestScore = score;
            move = { a, i, j };
          }
          alpha = (alpha < score) ? score : alpha;
        }

      }
      if (alpha >= beta) { break; }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    let action = b_move;
    for (let k = 0; k < 9; k++) {
      for (let l = 0; l < action.length; l++) {
        // Is the spot available?
        let i = Math.floor(k / 3);
        let j = k % 3;
        let score;
        if (board[i][j] == '') {
          let a = action[0];
          action.shift();
          board[i][j] = a;
          flag++;
          score = minimax(board, alpha, beta, true);
          board[i][j] = '';
          flag--;
          action.push(a)
          if (score < bestScore) {
            bestScore = score;
            move = { a, i, j };
          }
          beta = (beta < score) ? beta : score;
        }
      }
      if (alpha >= beta) { break; }
    }
    return bestScore;
  }
}