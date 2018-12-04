import {getElementFromTemplate, changeScreen} from './util.js';
import getHeader from './header.js';
import {changeLives} from './../data/change-lives.js';
import {changeLevel} from './../data/change-level.js';
import {changeAnswer} from './../data/change-answer.js';
import getStatsBar from './stats-bar.js';
import getStatsScreen from './05-stats-screen.js';

const getGameScreen = (levels, newGame) => {
  let game = newGame;
  const level = levels[`level-${game.level}`];
  const checkAnswers = (levelAnswers, userAnswers) => {
    if (levelAnswers.join(``) !== userAnswers.join(``)) {
      game = changeAnswer(game, {'answer': 0, 'time': 12000});
      game = changeLives(game, game.lives - 1);
    } else {
      game = changeAnswer(game, {'answer': 1, 'time': 12000});
    }
  };

  const MAX_GAME_LEVEL = Object.keys(levels).length - 1;
  const changeGameScreen = () => {
    if (game.lives < 0 || game.level === MAX_GAME_LEVEL) {
      changeScreen(getStatsScreen(game));
    } else {
      game = changeLevel(game, game.level += 1);
      changeScreen(getGameScreen(levels, game));
    }
  };

  const getOneImage = () => {
    const template = `
    <section class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src=${level.images[0]} alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
    </section>`;

    const element = getElementFromTemplate(template);
    element.prepend(getHeader(game));

    const section = element.querySelector(`section`);
    section.appendChild(getStatsBar(game));

    const inputs = element.querySelectorAll(`input[type="radio"]`);

    inputs.forEach((item) => {
      item.addEventListener(`change`, (evt) => {
        const value = evt.target.value;
        checkAnswers([value], level.answers);
        changeGameScreen();
      });
    });

    return element;
  };
  const getTwoImages = () => {
    const template = `<section class="game">
      <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
      <form class="game__content">
        ${level.images.map((item, index) => {
    return `<div class="game__option">
            <img src=${item} alt="Option ${index + 1}" width="468" height="458">
            <label class="game__answer game__answer--photo">
              <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
          </div>`;
  }).join(``)}
      </form>
    </section>`;

    const element = getElementFromTemplate(template);
    element.prepend(getHeader(game));

    const section = element.querySelector(`section`);
    section.appendChild(getStatsBar(game));

    const form = element.querySelector(`form`);
    const inputs = form.querySelectorAll(`input[type="radio"]`);

    form.addEventListener(`change`, () => {
      const inputValues = [];
      const checkedInputs = Array.from(inputs).filter((item) => {
        if (item.checked === true) {
          inputValues.push(item.value);
        }
        return item.checked;
      });
      const MIN_CHECKED_INPUTS = 2;
      if (checkedInputs.length >= MIN_CHECKED_INPUTS) {
        checkAnswers(inputValues, level.answers);
        changeGameScreen();
      }
    });
    return element;
  };
  const getThreeImages = () => {
    const template = `<section class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content  game__content--triple">
        ${level.images.map((item, index) => {
    return `<div class="game__option">
            <img src="${item}" alt="Option ${index + 1}" width="304" height="455">
          </div>`;
  }).join(``)}
      </form>
    </section>`;

    const element = getElementFromTemplate(template);
    element.prepend(getHeader(game));

    const section = element.querySelector(`section`);
    section.appendChild(getStatsBar(game));

    const items = element.querySelectorAll(`.game__option img`);
    items.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        const value = evt.target.alt;
        checkAnswers([value], level.answers);
        changeGameScreen();
      });
    });
    return element;
  };

  const ONE_IMAGE = 1;
  const TWO_IMAGES = 2;
  const THREE_IMAGES = 3;
  switch (level.images.length) {
    case ONE_IMAGE:
      return getOneImage();
    case TWO_IMAGES:
      return getTwoImages();
    case THREE_IMAGES:
      return getThreeImages();
    default:
      return true;
  }
};


export default getGameScreen;
