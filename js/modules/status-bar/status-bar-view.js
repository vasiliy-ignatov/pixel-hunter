import AbstractView from './../abstract-view.js';

export default class StatusBarView extends AbstractView {
  constructor(state) {
    super();
    this.answers = state.answers;
  }
  get template() {
    return `<ul class="stats">
      ${this.answers.map((item) => {
    if (item.answer === 0) {
      return `<li class="stats__result stats__result--wrong"></li>`;
    } else {
      return `<li class="stats__result stats__result--correct"></li>`;
    }
  })
      .join(``)}
      ${new Array(10 - this.answers.length)
        .fill(`<li class="stats__result stats__result--unknown"></li>`)
        .join(``)}

    </ul>`;
  }
}
