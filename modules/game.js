import { createText } from "./helpers.js";
import { enemyAttack, playerAttack } from "./attack.js";
import { generateLogs } from "./displayingLogs.js";
import isWinner from "./isWinner.js";
import Player from "./playerClass.js";

const $arenas = document.querySelector(".arenas");
const $form = document.querySelector(".control");
const $chat = document.querySelector(".chat");

export default class Game {
  start() {
    const player1 = new Player({
      player: 1,
      name: "Scorpion",
      hp: 100,
      img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    });

    const player2 = new Player({
      player: 2,
      name: "Subzero",
      hp: 100,
      img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    });

    $chat.insertAdjacentHTML(
      "afterbegin",
      `<p>${createText(player1, player2)}</p>`
    );

    function createPlayer({ player, name, img, hp }) {
      return `
    <div class="player${player}">
      <div class="progressbar">
        <div class="life" style="width: ${hp}%"></div>
        <div class="name" name="${name}">${name}</div>
      </div>
      <div class="character">
        <img src=${img}>
      </div>
    </div>
  `;
    }

    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      const { value: eValue, hit: eHit, defence: eDefence } = enemyAttack();

      const { value: pValue, hit: pHit, defence: pDefence } = playerAttack();

      if (pHit !== eDefence) {
        player2.changeHP(pValue);
        player2.renderHP();
        generateLogs("hit", player1, player2, pValue);
      } else generateLogs("defence", player1, player2);
      if (eHit !== pDefence) {
        player1.changeHP(eValue);
        player1.renderHP();
        generateLogs("hit", player2, player1, eValue);
      } else generateLogs("defence", player2, player1);

      isWinner(player1, player2);
    });

    $arenas.insertAdjacentHTML("beforeend", createPlayer(player1));
    $arenas.insertAdjacentHTML("beforeend", createPlayer(player2));
  }
}
