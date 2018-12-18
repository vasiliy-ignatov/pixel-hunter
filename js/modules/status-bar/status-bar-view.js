import AbstractView from './../abstract-view.js';

const MIN_ANSWERS_LENGTH = 10;
const INVALID_ANSWER_VALUE = 0;
const TimeValue = {
  FAST: 20,
  SLOW: 10
};


export default class StatusBarView extends AbstractView {
  constructor(state) {
    super();
    this.answers = state.answers;
  }
  get template() {
    return `<ul class="stats">
      ${this.answers.map((item) => {
    if (item.answer === INVALID_ANSWER_VALUE) {
      return `<li class="stats__result stats__result--wrong"></li>`;
    } else {
      if (item.time > TimeValue.FAST) {
        return `<li class="stats__result stats__result--fast"></li>`;
      } else if (item.time < TimeValue.SLOW) {
        return `<li class="stats__result stats__result--slow"></li>`;
      } else {
        return `<li class="stats__result stats__result--correct"></li>`;
      }
    }
  })
      .join(``)}
      ${new Array(MIN_ANSWERS_LENGTH - this.answers.length)
        .fill(`<li class="stats__result stats__result--unknown"></li>`)
        .join(``)}

    </ul>`;
  }
}
