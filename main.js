const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");
const $player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["sword", "bow", "katana"],
  attack: () => {
    console.log(this.name + " " + Fight);
  },
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

const getRandomNumber = () => Math.ceil(Math.random() * 20);

const changeHP = (player) => {
  const $playerLife = document.querySelector(`.player${player.player} .life`);
  player.hp -= getRandomNumber();
  if (player.hp < 0) {
    player.hp = 0;
  }

  $playerLife.style.width = player.hp + "%";
};

const gameResult = (name, res) => {
  const $resultTitle = createElement("div", "resultTitle");
  $resultTitle.textContent = `${name} ${res}!`;
  return $resultTitle;
};

const restartGame = (player1, player2) => {
  const $player1Life = document.querySelector(`.player1 .life`);
  const $player2Life = document.querySelector(`.player2 .life`);
  $arenas.removeChild(document.querySelector(".resultTitle"));
  player1.hp = 100;
  player2.hp = 100;
  $player1Life.style.width = player1.hp + "%";
  $player2Life.style.width = player2.hp + "%";
};

$randomButton.addEventListener("click", () => {
  if ($randomButton.textContent === "New Game") {
    restartGame($player1, $player2);
    $randomButton.textContent = "Random";
  } else {
    changeHP($player1);
    changeHP($player2);
    if ($player1.hp === 0 && $player2.hp === 0) {
      $arenas.appendChild(gameResult(" ", "Draw"));
      // $randomButton.disabled = true;
      $randomButton.textContent = "New Game";
      return;
    }
    if ($player1.hp <= 0) {
      $arenas.appendChild(gameResult($player2.name, "wins"));
      // $randomButton.disabled = true;
      $randomButton.textContent = "New Game";
    }
    if ($player2.hp <= 0) {
      $arenas.appendChild(gameResult($player1.name, "wins"));
      // $randomButton.disabled = true;
      $randomButton.textContent = "New Game";
    }
  }
});

$arenas.appendChild(createPlayer($player1));
$arenas.appendChild(createPlayer($player2));
