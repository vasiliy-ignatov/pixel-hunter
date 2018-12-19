import AbstractView from './../abstract-view.js';
import InfoBarScreen from './../info-bar/info-bar-screen.js';
import StatusBarScreen from './../status-bar/status-bar-screen.js';

export default class GameTrioView extends AbstractView {
  constructor(level, game) {
    super();
    this.level = level;
    this.game = game;
    this.infobar = new InfoBarScreen(this.game).template;
  }
  get template() {
    return `<section class="game">
      <p class="game__task">${this.level.question}</p>
      <form class="game__content  game__content--triple">
        ${this.level.images.map((item, index) => {
    return `<div class="game__option">
            <img src="${item}" alt="Option ${index + 1}" width="304" height="455" data-answer="${this.level.answers[index]}">
          </div>`;
  }).join(``)}
      </form>
    </section>`;
  }
  render() {
    const element = super.render();
    element.prepend(this.infobar.element);

    const section = element.querySelector(`section`);
    section.appendChild(new StatusBarScreen(this.game).element);
    return element;
  }
  onClick() {
  }
  bind() {
    const items = this.element.querySelectorAll(`.game__option img`);
    const AnswerTypes = {
      PHOTO: `photo`,
      PAINT: `painting`
    };
    const answerPhotoCounter = this.level.answers.filter((item) => {
      return item === AnswerTypes.PHOTO;
    }).length;

    const dataAnswerType = answerPhotoCounter > 1 ? AnswerTypes.PAINT : AnswerTypes.PHOTO;

    const getAnswerFlag = (dataAnswer, currentAnswer) => {
      return dataAnswer === currentAnswer;
    };
    items.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        const userAnswer = evt.target.dataset.answer;

        this.onClick(getAnswerFlag(dataAnswerType, userAnswer));
      });
    });
  }
}
