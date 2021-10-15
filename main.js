const arenas = document.querySelector(".arenas");
const player1 = {
  name: "Scorpion",
  hp: 10,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["sword", "bow", "katana"],
  attack: () => {
    console.log(this.name + " " + Fight);
  },
};
const player2 = {
  name: "Subzero",
  hp: 23,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["sword", "bow", "katana"],
  attack: () => {
    console.log(this.name + " " + Fight);
  },
};

const createPlayer = (playerClass, playerObj) => {
  const player = document.createElement("div");
  player.classList.add(`${playerClass}`);
  const progressbar = document.createElement("div");
  progressbar.classList.add("progressbar");
  const character = document.createElement("div");
  character.classList.add("character");
  const life = document.createElement("div");
  life.classList.add("life");
  const name = document.createElement("div");
  name.classList.add("name");
  name.textContent = playerObj.name;
  const img = document.createElement("img");
  life.setAttribute("style", `width: ${playerObj.hp}%`);
  name.setAttribute("name", playerObj.name);
  img.setAttribute("src", `${playerObj.img}`);
  player.appendChild(progressbar);
  player.appendChild(character);
  progressbar.appendChild(life);
  progressbar.appendChild(name);
  character.appendChild(img);
  arenas.appendChild(player);
};

createPlayer("player1", player1);
createPlayer("player2", player2);
