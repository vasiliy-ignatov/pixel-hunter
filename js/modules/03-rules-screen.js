import {getElementFromTemplate, changeScreen} from './util.js';
import getGameScreen from './04-game-screen.js';
import getHeader from './header.js';
import {INITIAL_GAME, levels} from './../data/quest.js';

const getRulesScreen = () => {
  const screenTemplate = `<section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>`;

  const element = getElementFromTemplate(screenTemplate);
  element.prepend(getHeader());

  const input = element.querySelector(`.rules__input`);
  const button = element.querySelector(`button.rules__button`);
  const newGame = Object.assign({}, INITIAL_GAME);
  newGame.answers = [];

  input.addEventListener(`keyup`, () => {
    const value = input.value;

    if (value.trim().length) {
      button.disabled = false;
      button.addEventListener(`click`, () => {
        changeScreen(getGameScreen(levels, newGame));
      });
    } else {
      button.disabled = true;
      button.removeEventListener(`click`, () => {
        changeScreen(getGameScreen(levels, newGame));
      });
    }
  });

  return element;
};

export default getRulesScreen;
