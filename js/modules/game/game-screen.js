import Application from './../application.js';
import GameSingleView from './game-single-view.js';
import GameDualView from './game-dual-view.js';
import GameTrioView from './game-trio-view.js';
import Timer from './../timer.js';

const AnswerValue = {
  CORRECT: 1,
  INVALID: 0
};
const TimerValue = {
  AVERAGE: 15,
  MAX: 30
};
const LengthOfImages = {
  ONE: 1,
  TWO: 2,
  THREE: 3
};

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.level = this.model.getCurrentLevel();
    this.template = null;
    this.timer = new Timer();
    this.timer.onTick = () => {
      this.onTick();
    };

    switch (this.level.images.length) {
      case LengthOfImages.ONE:
        this.getSingleView();
        break;
      case LengthOfImages.TWO:
        this.getDualView();
        break;
      case LengthOfImages.THREE:
        this.getTrioView();
        break;
    }
    this.element = this.template.element;
  }

  takeAnswer(levelAnswers, userAnswers) {
    if (levelAnswers.join(``) !== userAnswers.join(``)) {
      this.model.takeAnswer(AnswerValue.INVALID, TimerValue.AVERAGE);
      this.model.decreaseLife();
    } else {
      this.model.takeAnswer(AnswerValue.CORRECT, this.timer.value);
    }
    this.nextLevel();
  }

  nextLevel() {
    this.stopGame();
    if (this.model.isDead() || !this.model.hasNextLevel()) {
      Application.showStats(this.model.state);
    } else {
      this.model.nextLevel();
      Application.updateGame(this.model);
    }
  }

  onTick() {
    if (this.timer.value >= TimerValue.MAX) {
      this.model.takeAnswer(AnswerValue.INVALID, TimerValue.AVERAGE);
      this.model.decreaseLife();
      this.nextLevel();
    } else {
      this.updateTimer();
    }
  }
  updateTimer() {
    this.template.infobar.updateTimer(this.timer);
  }

  getSingleView() {
    this.template = new GameSingleView(this.level, this.model.state);

    this.template.onRadioChange = (inputValue) => {
      this.takeAnswer([inputValue], this.level.answers);
    };
  }

  getDualView() {
    this.template = new GameDualView(this.level, this.model.state);
    const MIN_CHECKED_INPUTS = 2;

    this.template.onFormChange = (checkedInputs, inputValues) => {
      if (checkedInputs.length >= MIN_CHECKED_INPUTS) {
        this.takeAnswer(inputValues, this.level.answers);
      }
    };
  }

  getTrioView() {
    this.template = new GameTrioView(this.level, this.model.state);

    this.template.onClick = (value) => {
      this.takeAnswer([value], this.level.answers);
    };
  }

  startGame() {
    this.timer.start();
  }
  stopGame() {
    this.timer.stop();
  }
}
