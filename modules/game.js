import { createText } from "./helpers.js";
import { playerAttack } from "./attack.js";
import { generateLogs } from "./displayingLogs.js";
import isWinner from "./isWinner.js";
import Player from "./playerClass.js";

if (!localStorage.getItem("player")) {
  window.location.pathname = "starting_page.html";
}

const {
  id: idPl,
  name: namePl,
  hp: hpPl,
  img: imgPl,
} = JSON.parse(localStorage.getItem("player"));
const {
  id: idEnemy,
  name: nameEnemy,
  hp: hpEnemy,
  img: imgEnemy,
} = JSON.parse(localStorage.getItem("enemy"));

export default class Game {
  constructor() {
    this.$arenas = document.querySelector(".arenas");
    this.$form = document.querySelector(".control");
    this.$chat = document.querySelector(".chat");
  }
  start() {
    const player1 = new Player({
      player: 1,
      id: idPl,
      name: namePl,
      hp: hpPl,
      img: imgPl,
    });

    const player2 = new Player({
      player: 2,
      id: idEnemy,
      name: nameEnemy,
      hp: hpEnemy,
      img: imgEnemy,
    });

    this.$chat.insertAdjacentHTML(
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

    this.$form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const { hit, defence } = playerAttack();

      const players = await fetch(
        "http://reactmarathon-api.herokuapp.com/api/mk/player/fight",
        {
          method: "POST",
          body: JSON.stringify({
            hit: hit,
            defence: defence,
          }),
        }
      ).then((res) => res.json());

      const { value: pValue, hit: pHit, defence: pDefence } = players.player1;
      const { value: eValue, hit: eHit, defence: eDefence } = players.player2;

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

    this.$arenas.insertAdjacentHTML("beforeend", createPlayer(player1));
    this.$arenas.insertAdjacentHTML("beforeend", createPlayer(player2));
  }
}
