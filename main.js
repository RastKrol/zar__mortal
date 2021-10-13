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
  const character = document.createElement("div");
  const life = document.createElement("div");
  const name = document.createElement("div");
  const img = document.createElement("img");
  img.setAttribute("src", `${playerObj.img}`);
  name.textContent = playerObj.name;
  progressbar.classList.add("progressbar");
  character.classList.add("character");
  life.classList.add("life");
  name.classList.add("name");
  life.setAttribute("style", `width: ${playerObj.hp}%`);
  name.setAttribute("name", playerObj.name);
  player.appendChild(progressbar);
  player.appendChild(character);
  progressbar.appendChild(life);
  progressbar.appendChild(name);
  character.appendChild(img);
  arenas.appendChild(player);
  console.log("wow");
};

// const createPlayer = (playerClass) => {
//   return `
//     <div class="${playerClass}">
//       <div class="progressbar">
//         <div class="life"></div>
//         <div class="name"></div>
//       </div>
//       <div class="character">
//         <img src="http://reactmarathon-api.herokuapp.com/assets/scorpion.gif" />
//       </div>
//     </div>
//   `;
// };
// arenas.insertAdjacentHTML("afterbegin", createPlayer);

createPlayer("player1", player1);
createPlayer("player2", player2);
