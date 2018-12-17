import AbstractView from './../abstract-view.js';
import InfoBarScreen from './../info-bar/info-bar-screen.js';
import StatusBarScreen from './../status-bar/status-bar-screen.js';

export default class GameTrioView extends AbstractView {
  constructor(level, game) {
    super();
    this.level = level;
    this.game = game;
    this.infobar = new InfoBarScreen(this.game).template;
    console.log(this.level);
  }
  get template() {
    return `<section class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content  game__content--triple">
        ${this.level.images.map((item, index) => {
    return `<div class="game__option">
            <img src="${item}" alt="Option ${index + 1}" width="304" height="455">
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
    items.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        const value = evt.target.alt;
        this.onClick(value);
      });
    });
  }
}
