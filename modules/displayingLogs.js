import { getRandomNumber } from "./helpers.js";
import logs from "./logs.js";

const $chat = document.querySelector(".chat");

let time = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

export const generateLogs = (type, attackPl, defencePl, value) => {
  let text;
  time = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  const indexHit = getRandomNumber(logs["hit"].length - 1);
  const indexDefence = getRandomNumber(logs["defence"].length - 1);
  switch (type) {
    case "hit":
      text = `${time}
      ${logs[type][indexHit]
        .replace("[playerKick]", attackPl.name)
        .replace("[playerDefence]", defencePl.name)}
      -${value} ${defencePl.hp}/100`;
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
