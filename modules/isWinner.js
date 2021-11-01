import logs from "./logs.js";
import { getRandomNumber } from "./helpers.js";

const $arenas = document.querySelector(".arenas");
const $form = document.querySelector(".control");
const $chat = document.querySelector(".chat");

function createReloadButton() {
  return `
    <div class="reloadWrap">
      <button class="button" type="button">Reload</button>
    </div>
  `;
}

function restartGame() {
  window.location.pathname = "starting_page.html";
}

const gameResult = (name) => {
  if (name) {
    return `<div class="resultTitle">${name} wins!</div>`;
  } else return `<div class="resultTitle">Draw</div>`;
};

function isWinner(player1, player2) {
  if (player1.hp <= 0 || player2.hp <= 0) {
    $form.querySelector(".button").disabled = true;
    $arenas.insertAdjacentHTML("afterbegin", createReloadButton());

    const reloadBtn = document.querySelector(".reloadWrap .button");
    reloadBtn.addEventListener("click", restartGame);
  }

  if (player1.hp === 0 && player2.hp === 0) {
    $arenas.insertAdjacentHTML("afterbegin", gameResult());
    $chat.insertAdjacentHTML("afterbegin", logs["draw"]);
    return;
  }
  if (player1.hp <= 0) {
    $arenas.insertAdjacentHTML("afterbegin", gameResult(player2.name));
    text = `${logs["end"][getRandomNumber(logs["end"].length - 1)]
      .replace("[playerWins]", player2.name)
      .replace("[playerLose]", player1.name)}`;
    $chat.insertAdjacentHTML("afterbegin", text);
  }
  if (player2.hp <= 0) {
    $arenas.insertAdjacentHTML("afterbegin", gameResult(player1.name));
    text = `${logs["end"][getRandomNumber(logs["end"].length - 1)]
      .replace("[playerWins]", player1.name)
      .replace("[playerLose]", player2.name)}`;
    $chat.insertAdjacentHTML("afterbegin", text);
  }
}

export default isWinner;
