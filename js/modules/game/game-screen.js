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
  MIN: 0
};
const GameType = {
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
      this._onTick();
    };

    switch (this.level.images.length) {
      case GameType.ONE:
        this._getSingleView();
        break;
      case GameType.TWO:
        this._getDualView();
        break;
      case GameType.THREE:
        this._getTrioView();
        break;
    }
    this.element = this.template.element;
  }

  _onAnswer(answerFlag) {
    if (answerFlag) {
      this.model.takeAnswer(AnswerValue.CORRECT, this.timer.value);
    } else {
      this.model.takeAnswer(AnswerValue.INVALID, TimerValue.AVERAGE);
      this.model.decreaseLife();
    }
    this._nextLevel();
  }

  _nextLevel() {
    this.stopGame();
    if (this.model.isDead() || !this.model.hasNextLevel()) {
      Application.showStats(this.model);
    } else {
      this.model.nextLevel();
      Application.updateGame(this.model);
    }
  }

  _onTick() {
    if (this.timer.value < TimerValue.MIN) {
      this.model.takeAnswer(AnswerValue.INVALID, TimerValue.AVERAGE);
      this.model.decreaseLife();
      this._nextLevel();
    } else {
      this._updateTimer();
    }
  }
  _updateTimer() {
    this.template.infobar.updateTimer(this.timer);
  }

  _getSingleView() {
    this.template = new GameSingleView(this.level, this.model.state);

    this.template.onRadioChange = (answerFlag) => {
      this._onAnswer(answerFlag);
    };
  }

  _getDualView() {
    this.template = new GameDualView(this.level, this.model.state);
    const MIN_CHECKED_INPUTS = 2;

    this.template.onFormChange = (checkedInputs, answerFlag) => {
      if (checkedInputs.length >= MIN_CHECKED_INPUTS) {
        this._onAnswer(answerFlag);
      }
    };
  }

  _getTrioView() {
    this.template = new GameTrioView(this.level, this.model.state);

    this.template.onClick = (answerFlag) => {
      this._onAnswer(answerFlag);
    };
  }

  startGame() {
    this.timer.start();
  }
  stopGame() {
    this.timer.stop();
  }
}
