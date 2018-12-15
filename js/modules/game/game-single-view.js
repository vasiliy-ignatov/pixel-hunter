import AbstractView from './../abstract-view.js';
import InfoBarScreen from './../info-bar/info-bar-screen.js';
import StatusBarScreen from './../status-bar/status-bar-screen.js';

export default class GameSingleView extends AbstractView {
  constructor(level, game) {
    super();
    this.level = level;
    this.game = game;
    this.infobar = new InfoBarScreen(this.game).getInfoBarView();
  }
  get template() {
    return `
    <section class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src=${this.level.images[0]} alt="Option 1" width="705" height="455">
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
  }
  render() {
    const element = super.render();
    element.prepend(this.infobar.element);

    const section = element.querySelector(`section`);
    section.appendChild(new StatusBarScreen(this.game).getStatusBarView());
    return element;
  }
  onRadioChange() {
  }
  bind() {
    const inputs = this.element.querySelectorAll(`input[type="radio"]`);
    const form = this.element.querySelector(`form`);

    inputs.forEach((item) => {
      item.addEventListener(`change`, () => {
        const activeInput = form.querySelector(`input:checked`);
        const inputValue = activeInput.value;

        this.onRadioChange(inputValue);
      });
    });
  }
}
