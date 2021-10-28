import logs from "./logs.js";

export const getRandomNumber = (num) => Math.ceil(Math.random() * num);

let time = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

export function createText(pl1, pl2) {
  let text = `
        ${logs["start"]
          .replace("[time]", time)
          .replace("[player1]", pl1.name)
          .replace("[player2]", pl2.name)}`;
  return text;
}
