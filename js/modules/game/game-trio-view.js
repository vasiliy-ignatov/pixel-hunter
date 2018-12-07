import AbstractView from './../abstract-view.js';
import {getInfoBar} from './../info-bar/info-bar-screen.js';
import {getStatusBar} from './../status-bar/status-bar-screen.js';

export default class GameTrioView extends AbstractView {
  constructor(level, game) {
    super();
    this.level = level;
    this.game = game;
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
    element.prepend(getInfoBar(this.game));

    const section = element.querySelector(`section`);
    section.appendChild(getStatusBar(this.game));
    return element;
  }
  onClick() {
  }
  bind() {
    const items = this.element.querySelectorAll(`.game__option`);
    items.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        const element = evt.target.closest(`.game__option`);
        element.classList.add(`game__option--selected`);
        this.onClick();
      });
    });
  }
}
