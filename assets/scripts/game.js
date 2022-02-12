// 1. Dois jogadores OK
// 2. Jogadores jogam ao mesmo tempo
// 3. O jogo só tem uma rodada
// 4. Papel vence pedra
// 5. Pedra vence tesoura
// 6. Tesoura vence papel
// 7. Se os dois escolherem a mesma coisa, empate
// 8. Contabilizar quantidade de vitórias de cada jogador

// Variáveis com o nome todo maiúsculo significam que o valor delas não pode ser modificado por outros desenvolvedores
// Enums são objetos contendo strings que serão usadas como condições, para evitar erros de digitação
const SELECTION_ENUM = {
  rock: "ROCK",
  paper: "PAPER",
  scissors: "SCISSORS",
};

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.winner;
    this.gameOver = false;
  }

  // Verificar quem venceu
  checkWinner() {
    // Empate
    if (this.player1.currentSelection === this.player2.currentSelection) {
      this.gameOver = true;
      return console.log("Empate!");
    }

    // Condições de vitória do jogador 2
    if (
      (this.player1.currentSelection === SELECTION_ENUM.rock &&
        this.player2.currentSelection === SELECTION_ENUM.paper) ||
      (this.player1.currentSelection === SELECTION_ENUM.paper &&
        this.player2.currentSelection === SELECTION_ENUM.scissors) ||
      (this.player1.currentSelection === SELECTION_ENUM.scissors &&
        this.player2.currentSelection === SELECTION_ENUM.rock)
    ) {
      this.gameOver = true;
      this.player2.wins++;
      this.winner = this.player2;
      return console.log("Jogador 2 ganhou!");
    }

    // Condições de vitória do jogador 1
    if (
      (this.player1.currentSelection === SELECTION_ENUM.paper &&
        this.player2.currentSelection === SELECTION_ENUM.rock) ||
      (this.player1.currentSelection === SELECTION_ENUM.scissors &&
        this.player2.currentSelection === SELECTION_ENUM.paper) ||
      (this.player1.currentSelection === SELECTION_ENUM.rock &&
        this.player2.currentSelection === SELECTION_ENUM.scissors)
    ) {
      this.gameOver = true;
      this.player1.wins++;
      this.winner = this.player1;
      return console.log("Jogador 1 ganhou!");
    }
  }

  restart() {
    // Zerar as seleções do jogador 1 e 2
    this.player1.currentSelection = "";
    this.player2.currentSelection = "";
    // Atribuir o gameOver para false
    this.gameOver = false;
    // Resetar o vencedor
    this.winner = undefined;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.wins = 0;
    this.currentSelection = "";
  }

  // selection poderá ser: 'ROCK', 'PAPER', 'SCISSORS'
  // Escolher pedra, papel ou tesoura
  pick(selection) {
    // Usando enums para evitar erros de digitação
    this.currentSelection = SELECTION_ENUM[selection];
  }
}

// const game = new Game(new Player("pedro"), new Player("CPU"));

// console.log(game);

// game.player1.pick("paper");
// game.player2.pick("paper");

// game.checkWinner();

// console.log(game);
