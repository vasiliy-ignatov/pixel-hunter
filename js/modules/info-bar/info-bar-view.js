import AbstractView from './../abstract-view.js';

const ALERT_TIME_VALUE = 5;
const EVEN_NUMBER = 2;
const MAX_GAME_LIVES = 3;

export default class InfoBarView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    const getState = () => {
      if (this.state) {
        return `<div class="game__timer">${this.state.time}</div>
        <div class="game__lives">
          ${new Array(this.state.lives)
            .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
            .join(``)}
          ${new Array(MAX_GAME_LIVES - this.state.lives)
            .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
            .join(``)}
        </div>`;
      } else {
        return ``;
      }
    };

    return `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
      ${getState()}
    </header>`;
  }
  onClick() {
  }
  updateTimer(timer) {
    this.timer = timer;
    const timerElement = this.element.querySelector(`.game__timer`);
    timerElement.textContent = this.timer.value;

    if (this.timer.value <= ALERT_TIME_VALUE) {
      if (this.timer.value % EVEN_NUMBER !== 0) {
        timerElement.style.color = `red`;
      } else {
        timerElement.style.color = ``;
      }
    }
  }
  bind() {
    const agreeButton = this.element.querySelector(`button.back`);
    agreeButton.addEventListener(`click`, () => {
      if (this.timer) {
        this.timer.stop();
      }
      this.onClick();
    });
  }
}
