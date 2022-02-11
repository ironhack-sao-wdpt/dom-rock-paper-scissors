// Instanciando as classes
const game = new Game(new Player(""), new Player("CPU"));

const rockBtnElement = document.getElementById("rockBtn");
const paperBtnElement = document.getElementById("paperBtn");
const scissorsBtnElement = document.getElementById("scissorsBtn");
const player1NameInputElement = document.getElementById("player1NameInput");
const player1SelectionElement = document.getElementById("player1Selection");
const player2SelectionElement = document.getElementById("player2Selection");
const player1BoxElement = document.getElementById("player1Box");
const player2BoxElement = document.getElementById("player2Box");
const winnerAnnouncementElement = document.getElementById("winnerAnnouncement");

function cpuPickRandom() {
  // Selecionar uma das 3 opções aleatoriamente
  const options = ["rock", "paper", "scissors"];

  // Gerar um número entre 0 e 2
  const randomNum = Math.floor(Math.random() * options.length);

  return options[randomNum];
}

function handleSelectionClick(selection) {
  // 1. Atualizar nome do jogador 1
  game.player1.name = player1NameInputElement.value;

  // 2. Jogador 1 escolhe uma jogada
  game.player1.pick(selection);

  // 3. Jogador 2 escolher uma jogada aleatoriamente
  game.player2.pick(cpuPickRandom());

  // 4. Atualizar a imagem em cada círculo para ser igual à jogada escolhida dos dois jogadores
  player1SelectionElement.src = `./assets/images/${game.player1.currentSelection.toLowerCase()}.svg`;

  player2SelectionElement.src = `./assets/images/${game.player2.currentSelection.toLowerCase()}.svg`;

  // 6. Verifica o ganhador
  game.checkWinner();

  // 7. Destaca o círculo do ganhador

  if (!game.winner) {
    return (winnerAnnouncementElement.innerText = `Tie!`);
  }

  if (game.winner.name === game.player1.name) {
    player1BoxElement.classList.add("winner");
    winnerAnnouncementElement.innerText = `${game.player1.name} Wins!!!!`;
  } else if (game.winner.name === game.player2.name) {
    player2BoxElement.classList.add("winner");
    winnerAnnouncementElement.innerText = `${game.player2.name} Wins!!!!`;
  }

  // 8. Atualiza quantidade de vitórias

  // 9. Jogador 1 reinicia
}

function highlightSelection(target) {
  // 5. Destacar na barra de seleções a escolha do jogador 1
  target.classList.add("selected");
}

rockBtnElement.addEventListener("click", (event) => {
  handleSelectionClick("rock");
  highlightSelection(event.target);
});

paperBtnElement.addEventListener("click", (event) => {
  handleSelectionClick("paper");
  highlightSelection(event.target);
});

scissorsBtnElement.addEventListener("click", (event) => {
  handleSelectionClick("scissors");
  highlightSelection(event.target);
});
