import AbstractView from './../abstract-view.js';
import InfoBarScreen from './../info-bar/info-bar-screen.js';
import StatusBarScreen from './../status-bar/status-bar-screen.js';

export default class GameDualView extends AbstractView {
  constructor(level, game) {
    super();
    this.level = level;
    this.game = game;
    this.infobar = new InfoBarScreen(this.game).template;
  }
  get template() {
    return `<section class="game">
      <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
      <form class="game__content">
        ${this.level.images.map((item, index) => {
    return `<div class="game__option">
            <img src=${item} alt="Option ${index + 1}" width="468" height="458">
            <label class="game__answer game__answer--photo">
              <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input class="visually-hidden" name="question${index + 1}" type="radio" value="painting">
              <span>Рисунок</span>
            </label>
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
  onFormChange() {
  }
  bind() {
    const form = this.element.querySelector(`form`);
    const inputs = form.querySelectorAll(`input[type="radio"]`);

    form.addEventListener(`change`, () => {
      const inputValues = [];
      const checkedInputs = Array.from(inputs).filter((item) => {
        if (item.checked === true) {
          inputValues.push(item.value);
        }
        return item.checked;
      });

      const getAnswerFlag = () => {
        return this.level.answers.join(``) === inputValues.join(``);
      };

      this.onFormChange(checkedInputs, getAnswerFlag());
    });
  }
}
