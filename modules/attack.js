import { getRandomNumber } from "./helpers.js";

const $form = document.querySelector(".control");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ["head", "body", "foot"];

export const playerAttack = () => {
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
