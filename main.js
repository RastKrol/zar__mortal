const $arenas = document.querySelector(".arenas");
// const $randomButton = document.querySelector(".button");
const $form = document.querySelector(".control");
const $chat = document.querySelector(".chat");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ["head", "body", "foot"];

const logs = {
  start:
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
};

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
  weapon: ["sword", "bow", "katana"],
  attack: () => {
    console.log(this.name + " " + Fight);
  },
  changeHP,
  elHP,
  renderHP,
};

let time = `${new Date().toLocaleDateString()} ${new Date()
  .toLocaleTimeString()
  .toString()}`;
let text = `
      ${logs["start"]
        .replace("[time]", time)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name)}`;
$chat.insertAdjacentHTML("afterbegin", `<p>${text}</p>`);

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
};

const createPlayer = (playerObj) => {
  const player = createElement("div", `player${playerObj.player}`);
  const $progressbar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  $name.textContent = playerObj.name;
  const $img = createElement("img");
  $life.setAttribute("style", `width: ${playerObj.hp}%`);
  $name.setAttribute("name", playerObj.name);
  $img.setAttribute("src", `${playerObj.img}`);
  player.appendChild($progressbar);
  player.appendChild($character);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);
  return player;
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
  if (player1.hp <= 0 || player2.hp <= 0) {
    // $randomButton.disabled = true;
    $form.querySelector(".button").disabled = true;
    $arenas.appendChild(createReloadButton());

    const reloadBtn = document.querySelector(".reloadWrap .button");
    reloadBtn.addEventListener("click", restartGame);
  }

  if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(gameResult());
    $chat.insertAdjacentHTML("afterbegin", logs["draw"]);
    return;
  }
  if (player1.hp <= 0) {
    $arenas.appendChild(gameResult(player2.name));
    text = `${logs["end"][getRandomNumber(logs["end"].length - 1)]
      .replace("[playerWins]", player2.name)
      .replace("[playerLose]", player1.name)}`;
    $chat.insertAdjacentHTML("afterbegin", text);
  }
  if (player2.hp <= 0) {
    $arenas.appendChild(gameResult(player1.name));
    text = `${logs["end"][getRandomNumber(logs["end"].length - 1)]
      .replace("[playerWins]", player1.name)
      .replace("[playerLose]", player2.name)}`;
    $chat.insertAdjacentHTML("afterbegin", text);
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
//   player1.changeHP(getRandomNumber(20));
//   player1.renderHP(player1.elHP());
//   player2.changeHP(getRandomNumber(20));
//   player2.renderHP(player2.elHP());

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

const playerAttack = () => {
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
  return attack;
};

const generateLogs = (type, attackPl, defencePl) => {
  time = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  const indexHit = getRandomNumber(logs["hit"].length - 1);
  const indexDefence = getRandomNumber(logs["defence"].length - 1);
  switch (type) {
    case "hit":
      text = `${time}
      ${logs[type][indexHit]
        .replace("[playerKick]", attackPl.name)
        .replace("[playerDefence]", defencePl.name)}
      ${100 - defencePl.hp} ${defencePl.hp}/100`;
      break;
    case "defence":
      text = `${time} ${logs[type][indexDefence]
        .replace("[playerKick]", attackPl.name)
        .replace("[playerDefence]", defencePl.name)}`;
      break;
    default:
      "";
  }
  const el = `<p>${text}</p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
};

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const enemy = enemyAttack();

  const player = playerAttack();

  if (player.hit !== enemy.defence) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs("hit", player1, player2);
  } else generateLogs("defence", player1, player2);
  if (enemy.hit !== player.defence) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs("hit", player2, player1);
  } else generateLogs("defence", player2, player1);

  isWinner();
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
