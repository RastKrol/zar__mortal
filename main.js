import logs from "./modules/logs.js";
import {
  getRandomNumber,
  changeHP,
  elHP,
  renderHP,
  createText,
} from "./modules/helpers.js";
import { enemyAttack, playerAttack } from "./modules/attack.js";
import { generateLogs } from "./modules/displayingLogs.js";
import isWinner from "./modules/isWinner.js";

const $arenas = document.querySelector(".arenas");
const $form = document.querySelector(".control");
const $chat = document.querySelector(".chat");

const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["sword", "bow", "katana"],
  attack: () => {
    console.log(this.name + " " + Fight);
  },
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: "Subzero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  // weapon: ["sword", "bow", "katana"],
  weapon: {
    sword: "katana",
    bow: "archer bow",
  },
  attack: () => {
    console.log(this.name + " " + Fight);
  },
  changeHP,
  elHP,
  renderHP,
};

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

// $randomButton.addEventListener("click", () => {
//   player1.changeHP(getRandomNumber(20));
//   player1.renderHP(player1.elHP());
//   player2.changeHP(getRandomNumber(20));
//   player2.renderHP(player2.elHP());

//   isWinner();
// });

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
