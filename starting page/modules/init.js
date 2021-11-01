import { createElement, createEmptyPlayerBlock } from "./helpers.js";
import { getRandomNumber } from "../../modules/helpers.js";

const $parent = document.querySelector(".parent");
const $player = document.querySelector(".player");

export default async function init() {
  localStorage.removeItem("player1");

  const players = await fetch(
    "https://reactmarathon-api.herokuapp.com/api/mk/players"
  ).then((res) => res.json());

  const enemy = await fetch(
    "https://reactmarathon-api.herokuapp.com/api/mk/player/choose"
  ).then((res) => res.json());

  let imgSrc = null;
  createEmptyPlayerBlock();

  players.forEach((item) => {
    const el = createElement("div", ["character", `div${item.id}`]);
    const img = createElement("img");

    el.addEventListener("mousemove", () => {
      if (imgSrc === null) {
        imgSrc = item.img;
        const $img = createElement("img");
        $img.src = imgSrc;
        $player.appendChild($img);
      }
    });

    el.addEventListener("mouseout", () => {
      if (imgSrc) {
        imgSrc = null;
        el.classList.remove("active");
        $player.innerHTML = "";
      }
    });

    el.addEventListener("click", () => {
      //TODO: Мы кладем нашего игрока в localStorage что бы потом на арене его достать.
      // При помощи localStorage.getItem('player1'); т.к. в localStorage кладется строка,
      // то мы должны ее распарсить обратным методом JSON.parse(localStorage.getItem('player1'));
      // но это уже будет в нашем классе Game когда мы инициализируем игроков.
      localStorage.setItem("player", JSON.stringify(item));
      localStorage.setItem("enemy", JSON.stringify(enemy));

      el.classList.add("active");

      setTimeout(() => {
        // TODO: Здесь должен быть код который перенаправит вас на ваше игровое поле...
        //  Пример использования: window.location.pathname = 'arenas.html';
        window.location.pathname = "arenas.html";
      }, 1000);
    });

    img.src = item.avatar;
    img.alt = item.name;

    el.appendChild(img);
    $parent.appendChild(el);
  });
}
