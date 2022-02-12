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
const player1WinsElement = document.getElementById("player1Wins");
const player2WinsElement = document.getElementById("player2Wins");
const restartBtnElement = document.getElementById("restartBtn");
const resetBtnElement = document.getElementById("resetBtn");

function cpuPickRandom() {
  // Selecionar uma das 3 opções aleatoriamente
  const options = ["rock", "paper", "scissors"];

  // Gerar um número entre 0 e 2
  const randomNum = Math.floor(Math.random() * options.length);

  return options[randomNum];
}

function validatePlayerName() {
  if (!player1NameInputElement.value) {
    alert("Please type your name.");
    player1NameInputElement.focus();
    return false;
  }

  return true;
}

function updatePlayerName() {
  game.player1.name = player1NameInputElement.value;
}

function updatePlayerSelectionImg(element, player) {
  element.src = `./assets/images/${player.currentSelection.toLowerCase()}.png`;
}

function isGameTied() {
  if (!game.winner) {
    winnerAnnouncementElement.innerText = `Tie!`;
    return true;
  }

  return false;
}

function updateWinnerBgColor(player) {
  player.classList.add("winner");
}

function updateWinnerAnnouncement(player) {
  winnerAnnouncementElement.innerText = `${player.name} Wins!!!!`;
}

function updatePlayerWinCount(element, player) {
  element.innerText = player.wins;
}

function updateWinnerUI() {
  // Checa se o player 1 venceu
  if (game.winner.name === game.player1.name) {
    // Adiciona a classe do fundo amarelo
    updateWinnerBgColor(game.player1);

    // Coloca o nome do vencedor no meio da tela
    updateWinnerAnnouncement(game.player1);

    // Atualiza a qtd. de vitórias
    updatePlayerWinCount(player1WinsElement, game.player1);

    return;
  }

  // Se não foi o player 1, só pode ser o player 2, pois checamos o empate antes
  // Adiciona a classe do fundo amarelo
  updateWinnerBgColor(game.player2);

  // Coloca o nome do vencedor no meio da tela
  updateWinnerAnnouncement(game.player2);

  // Atualiza a qtd. de vitórias
  updatePlayerWinCount(player2WinsElement, game.player2);
}

function resetPlayerChoices() {
  player1SelectionElement.src = "";
  player2SelectionElement.src = "";
}

function trySelectbyClassname(classname) {
  const selectedElement = document.querySelector(`.${classname}`);

  return selectedElement;
}

function removeClassname(element, classname) {
  if (element) {
    element.classList.remove(classname);
  }
}

function handleSelectionClick(selection) {
  // 1. Atualizar nome do jogador 1
  updatePlayerName();

  // 2. Jogador 1 escolhe uma jogada
  game.player1.pick(selection);

  // 3. Jogador 2 escolher uma jogada aleatoriamente
  game.player2.pick(cpuPickRandom());

  // 4. Atualizar a imagem em cada círculo para ser igual à jogada escolhida dos dois jogadores
  updatePlayerSelectionImg(player1SelectionElement, game.player1);
  updatePlayerSelectionImg(player2SelectionElement, game.player2);

  // 6. Verifica o ganhador
  game.checkWinner();

  // 7. Destaca o círculo do ganhador
  if (isGameTied()) {
    return;
  }

  updateWinnerUI();
}

function highlightSelection(target) {
  // 5. Destacar na barra de seleções a escolha do jogador 1
  target.parentElement.classList.add("selected");
}

rockBtnElement.addEventListener("click", (event) => {
  // Só deixa o jogador fazer uma jogada se ele já digitou seu nome
  if (!validatePlayerName()) {
    return;
  }

  // Só deixa o jogador fazer uma jogada caso ele não tenha feito ainda
  if (!game.player1.currentSelection) {
    handleSelectionClick("rock");
    highlightSelection(event.target);
  }
});

paperBtnElement.addEventListener("click", (event) => {
  // Só deixa o jogador fazer uma jogada se ele já digitou seu nome
  if (!validatePlayerName()) {
    return;
  }

  if (!game.player1.currentSelection) {
    handleSelectionClick("paper");
    highlightSelection(event.target);
  }
});

scissorsBtnElement.addEventListener("click", (event) => {
  // Só deixa o jogador fazer uma jogada se ele já digitou seu nome
  if (!validatePlayerName()) {
    return;
  }

  if (!game.player1.currentSelection) {
    handleSelectionClick("scissors");
    highlightSelection(event.target);
  }
});

// 9. Jogador 1 reinicia
restartBtnElement.addEventListener("click", () => {
  // 1. Resetar o vencedor e as escolhas dos jogadores
  game.restart();

  // 2. Resetar no DOM as imagens de escolha dos jogadores
  resetPlayerChoices();

  // 3. Limpar o destaque da seleção do Player 1 na barra de seleções
  const selectedElement = trySelectbyClassname("selected");
  removeClassname(selectedElement, "selected");

  // 4. Limpar o destaque do vencedor
  const winnerElement = trySelectbyClassname("winner");
  removeClassname(winnerElement, "winner");

  // 5. Limpar o anúncio do vencedor
  winnerAnnouncementElement.innerText = "";
});

resetBtnElement.addEventListener("click", () => window.location.reload());
