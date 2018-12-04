import {getElementFromTemplate, changeScreen} from './util.js';
import introScreen from './01-intro-screen.js';

const getHeader = (state) => {
  let headerTemplate = `<header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>`;

  if (state) {
    const MAX_GAME_LIVES = 4;
    headerTemplate = `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
      <div class="game__timer">${state.time}</div>
      <div class="game__lives">
        ${new Array(state.lives - 1)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
        ${new Array(MAX_GAME_LIVES - state.lives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
          .join(``)}
      </div>
    </header>`;
  }


  const headerElement = getElementFromTemplate(headerTemplate);

  const buttonBack = headerElement.querySelector(`button.back`);
  buttonBack.addEventListener(`click`, () => {
    changeScreen(introScreen);
  });
  return headerElement;
};

export default getHeader;
