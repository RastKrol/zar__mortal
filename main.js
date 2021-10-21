const $arenas = document.querySelector(".arenas");
// const $randomButton = document.querySelector(".button");
const $form = document.querySelector(".control");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ["head", "body", "foot"];

const $player1 = {
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
const $player2 = {
  player: 2,
  name: "Subzero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["sword", "bow", "katana"],
  attack: () => {
    console.log(this.name + " " + Fight);
  },
  changeHP,
  elHP,
  renderHP,
};

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
};

const createPlayer = (playerObj) => {
  const $player = createElement("div", `player${playerObj.player}`);
  const $progressbar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  $name.textContent = playerObj.name;
  const $img = createElement("img");
  $life.setAttribute("style", `width: ${playerObj.hp}%`);
  $name.setAttribute("name", playerObj.name);
  $img.setAttribute("src", `${playerObj.img}`);
  $player.appendChild($progressbar);
  $player.appendChild($character);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);
  return $player;
};

const getRandomNumber = (num) => Math.ceil(Math.random() * num);

function changeHP(damage) {
  if (this.hp - damage < 0) {
    this.hp = 0;
  } else {
    this.hp -= damage;
  }
}

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  this.elHP().style.width = this.hp + "%";
}

function isWinner() {
  if ($player1.hp <= 0 || $player2.hp <= 0) {
    // $randomButton.disabled = true;
    $form.querySelector(".button").disabled = true;
    $arenas.appendChild(createReloadButton());

    const reloadBtn = document.querySelector(".reloadWrap .button");
    reloadBtn.addEventListener("click", restartGame);
  }
  if ($player1.hp === 0 && $player2.hp === 0) {
    $arenas.appendChild(gameResult());
    return;
  }
  if ($player1.hp <= 0) {
    $arenas.appendChild(gameResult($player2.name));
  }
  if ($player2.hp <= 0) {
    $arenas.appendChild(gameResult($player1.name));
  }
}

function createReloadButton() {
  const div = createElement("div", "reloadWrap");
  const reloadBtn = createElement("button", "button");
  reloadBtn.textContent = "Reload";
  div.appendChild(reloadBtn);
  return div;
}

function restartGame() {
  window.location.reload(true);
}

const gameResult = (name) => {
  const $resultTitle = createElement("div", "resultTitle");
  if (name) {
    $resultTitle.textContent = `${name} wins!`;
  } else $resultTitle.textContent = `Draw`;
  return $resultTitle;
};

// $randomButton.addEventListener("click", () => {
//   $player1.changeHP(getRandomNumber(20));
//   $player1.renderHP($player1.elHP());
//   $player2.changeHP(getRandomNumber(20));
//   $player2.renderHP($player2.elHP());

//   isWinner();
// });

const enemyAttack = () => {
  const hit = ATTACK[getRandomNumber(3) - 1];
  const defence = ATTACK[getRandomNumber(3) - 1];
  return {
    value: getRandomNumber(HIT[hit]),
    hit,
    defence,
  };
};

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const enemy = enemyAttack();

  const attack = {};

  for (let item of $form) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandomNumber(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }
    item.checked = false;
  }

  if (attack.hit !== enemy.defence && enemy.hit === attack.defence) {
    $player2.changeHP(attack.value);
    $player2.renderHP();
    isWinner();
  } else if (attack.hit === enemy.defence && enemy.hit !== attack.defence) {
    $player1.changeHP(enemy.value);
    $player1.renderHP();
    isWinner();
  }
});

$arenas.appendChild(createPlayer($player1));
$arenas.appendChild(createPlayer($player2));
