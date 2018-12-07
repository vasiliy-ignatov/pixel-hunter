import {changeScreen} from './../util.js';
import RulesView from './rules-view.js';
import {INITIAL_GAME, levels} from './../../data/quest.js';
import {getGameScreen} from './../game/game-screen.js';

export const getRulesScreen = () => {
  const template = new RulesView();
  const newGame = Object.assign({}, INITIAL_GAME);

  const button = template.element.querySelector(`button.rules__button`);
  const input = template.element.querySelector(`.rules__input`);

  template.onInputChange = () => {
    const inputValue = input.value;
    if (inputValue.trim().length && (button.disabled === true)) {
      button.disabled = false;
      button.addEventListener(`click`, () => {
        changeScreen(getGameScreen(levels, newGame));
      });
    } else if (inputValue.trim().length === 0) {
      button.disabled = true;
      button.removeEventListener(`click`, () => {
        changeScreen(getGameScreen(levels, newGame));
      });
    }
  };

  return template.element;
};
