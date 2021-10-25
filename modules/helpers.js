import logs from "./logs.js";

export const getRandomNumber = (num) => Math.ceil(Math.random() * num);

export function changeHP(damage) {
  if (this.hp - damage < 0) {
    this.hp = 0;
  } else {
    this.hp -= damage;
  }
}

export function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

export function renderHP() {
  this.elHP().style.width = this.hp + "%";
}

let time = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

export function createText(pl1, pl2) {
  let text = `
        ${logs["start"]
          .replace("[time]", time)
          .replace("[player1]", pl1.name)
          .replace("[player2]", pl2.name)}`;
  return text;
}
