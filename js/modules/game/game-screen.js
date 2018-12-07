import {changeScreen} from './../util.js';
import {changeLives} from './../../data/change-lives.js';
import {changeLevel} from './../../data/change-level.js';
import {changeAnswer} from './../../data/change-answer.js';
import GameSingleView from './game-single-view.js';
import GameDualView from './game-dual-view.js';
import GameTrioView from './game-trio-view.js';
import {getStatictics} from './../statistics/statistics-screen.js';

export const getGameScreen = (levels, state) => {
  let game = state;
  const level = levels[`level-${game.level}`];
  const MAX_GAME_LEVEL = Object.keys(levels).length - 1;

  const checkAnswers = (levelAnswers, userAnswers) => {
    if (levelAnswers.join(``) !== userAnswers.join(``)) {
      game = changeAnswer(game, {'answer': 0, 'time': 12000});
      game = changeLives(game, game.lives - 1);
    } else {
      game = changeAnswer(game, {'answer': 1, 'time': 12000});
    }
  };

  const changeGameScreen = () => {
    if (game.lives < 0 || game.level === MAX_GAME_LEVEL) {
      changeScreen(getStatictics(game));
    } else {
      game = changeLevel(game, game.level += 1);
      changeScreen(getGameScreen(levels, game));
    }
  };

  const getSingleView = () => {
    const template = new GameSingleView(level, state);
    const form = template.element.querySelector(`form`);

    template.onRadioChange = () => {
      const activeInput = form.querySelector(`input:checked`);
      const inputValue = activeInput.value;

      checkAnswers([inputValue], level.answers);
      changeGameScreen();
    };
    return template.element;
  };

  const getDualView = () => {
    const template = new GameDualView(level, state);
    const form = template.element.querySelector(`form`);
    const inputs = form.querySelectorAll(`input[type="radio"]`);
    const MIN_CHECKED_INPUTS = 2;

    template.onFormChange = () => {
      const inputValues = [];
      const checkedInputs = Array.from(inputs).filter((item) => {
        if (item.checked === true) {
          inputValues.push(item.value);
        }
        return item.checked;
      });

      if (checkedInputs.length >= MIN_CHECKED_INPUTS) {
        checkAnswers(inputValues, level.answers);
        changeGameScreen();
      }
    };
    return template.element;
  };

  const getTrioView = () => {
    const template = new GameTrioView(level, state);
    template.onClick = () => {
      const selectedImage = template.element.querySelector(`.game__option--selected img`);
      const value = selectedImage.alt;
      checkAnswers([value], level.answers);
      changeGameScreen();
    };
    return template.element;
  };

  const ONE_IMAGE = 1;
  const TWO_IMAGES = 2;
  const THREE_IMAGES = 3;

  switch (level.images.length) {
    case ONE_IMAGE:
      return getSingleView();
    case TWO_IMAGES:
      return getDualView();
    case THREE_IMAGES:
      return getTrioView();
    default:
      return true;
  }
};
