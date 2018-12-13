import {changeScreen} from './../util.js';
import Application from './../application.js';
import GameSingleView from './game-single-view.js';
import GameDualView from './game-dual-view.js';
import GameTrioView from './game-trio-view.js';
import Timer from './../timer.js';

const ANSWER_VALUE = {
  'correct': 1,
  'invalid': 0
};
const TIMER_VALUE = {
  'average': 10,
  'max': 30
};
const LENGTH_OF_IMAGES = {
  'one': 1,
  'two': 2,
  'three': 3
};

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.level = null;
    this.timer = null;
  }

  takeAnswer(levelAnswers, userAnswers) {
    if (levelAnswers.join(``) !== userAnswers.join(``)) {
      this.model.takeAnswer(ANSWER_VALUE.invalid, TIMER_VALUE.average);
      this.model.decreaseLife();
    } else {
      this.model.takeAnswer(ANSWER_VALUE.correct, this.timer.value);
    }
    this.stopGame();
    this.nextLevel();
  }

  nextLevel() {
    if (this.model.isDead() || !this.model.hasNextLevel()) {
      Application.showStats(this.model.state);
    } else {
      this.model.nextLevel();
      changeScreen(this.getGameView());
      this.startGame();
    }
  }

  updateInfoBar(infobar) {
    if (this.timer.value > TIMER_VALUE.max) {
      this.model.takeAnswer(ANSWER_VALUE.invalid, TIMER_VALUE.average);
      this.model.decreaseLife();
      this.nextLevel();
    } else {
      infobar.updateTimer(this.timer);
    }
  }

  getSingleView() {
    const template = new GameSingleView(this.level, this.model.state);

    this.timer.onTick = () => {
      this.updateInfoBar(template.infobar);
    };
    template.onRadioChange = (inputValue) => {
      this.takeAnswer([inputValue], this.level.answers);
    };
    return template.element;
  }

  getDualView() {
    const template = new GameDualView(this.level, this.model.state);
    const MIN_CHECKED_INPUTS = 2;

    this.timer.onTick = () => {
      this.updateInfoBar(template.infobar);
    };
    template.onFormChange = (checkedInputs, inputValues) => {
      if (checkedInputs.length >= MIN_CHECKED_INPUTS) {
        this.takeAnswer(inputValues, this.level.answers);
      }
    };
    return template.element;
  }

  getTrioView() {
    const template = new GameTrioView(this.level, this.model.state);

    this.timer.onTick = () => {
      this.updateInfoBar(template.infobar);
    };

    template.onClick = (value) => {
      this.takeAnswer([value], this.level.answers);
    };
    return template.element;
  }

  getGameView() {
    this.level = this.model.getCurrentLevel();
    this.timer = new Timer(this.model.state);

    switch (this.level.images.length) {
      case LENGTH_OF_IMAGES.one:
        return this.getSingleView();
      case LENGTH_OF_IMAGES.two:
        return this.getDualView();
      case LENGTH_OF_IMAGES.three:
        return this.getTrioView();
      default:
        return false;
    }
  }

  startGame() {
    this.timer.start();
  }
  stopGame() {
    this.timer.stop();
  }
}
