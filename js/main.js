'use strict';

const Game = {
  screens: [],
  counter: 0,
  getContent: () => {
    const screens = {
      greeting: document.querySelector(`#greeting`),
      rules: document.querySelector(`#rules`),
      intro: document.querySelector(`#intro`),
      game1: document.querySelector(`#game-1`),
      game2: document.querySelector(`#game-2`),
      game3: document.querySelector(`#game-3`),
      stats: document.querySelector(`#stats`),
      mError: document.querySelector(`#modal-error`),
      mConfirm: document.querySelector(`#modal-confirm`)
    };

    for (let key in screens) {
      if (screens.hasOwnProperty(key)) {
        Game.screens.push(screens[key]);
      }
    }
  },
  showScreen: (number) => {
    const main = document.querySelector(`#main`);
    const clone = document.importNode(Game.screens[number].content, true);
    main.innerHTML = ``;
    main.appendChild(clone);
  },
  showArrows: () => {
    const template = `<div class="arrows__wrap"><style>
                      .arrows__wrap { position: absolute; top: 95px; left: 50%; margin-left: -56px; }
                      .arrows__btn { background: none; border: 2px solid black; padding: 5px 20px; }
                      </style><button class="arrows__btn"><-</button><button class="arrows__btn">-></button></div>`;

    const el = document.createElement(`div`);
    el.innerHTML = template;

    const pageBody = document.querySelector(`body`);
    pageBody.appendChild(el);

    const arrows = document.querySelectorAll(`.arrows__btn`);
    arrows[0].addEventListener(`click`, Game.prevPage);
    arrows[1].addEventListener(`click`, Game.nextPage);
  },
  pressArrow: (evt) => {
    const eventKey = evt.keyCode;
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;

    if (eventKey === RIGHT_ARROW) {
      Game.nextPage();
    }
    if (eventKey === LEFT_ARROW) {
      Game.prevPage();
    }
  },
  nextPage: () => {
    const maxScreenCount = Game.screens.length - 1;
    if (Game.counter < maxScreenCount) {
      Game.counter += 1;
      Game.showScreen(Game.counter);
    }
  },
  prevPage: () => {
    const minScreenCount = 0;
    if (Game.counter > minScreenCount) {
      Game.counter -= 1;
      Game.showScreen(Game.counter);
    }
  },
  init: () => {
    Game.getContent();
    Game.showArrows();
    Game.showScreen(Game.counter);
    document.addEventListener(`keydown`, Game.pressArrow);
  }
};

document.addEventListener(`DOMContentLoaded`, Game.init);
