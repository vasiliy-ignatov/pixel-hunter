import Application from './../application.js';
import RulesView from './rules-view.js';

export default class RulesScreen {
  constructor() {
    this.template = new RulesView();
    this.element = this.template.element;

    this.template.onInputChange = () => {
      const button = this.element.querySelector(`button.rules__button`);
      const input = this.element.querySelector(`.rules__input`);
      const inputValue = input.value;

      if (inputValue.trim().length && (button.disabled === true)) {
        button.disabled = false;
        button.addEventListener(`click`, () => {
          Application.showGame(inputValue);
        });
      } else if (inputValue.trim().length === 0) {
        button.disabled = true;
        button.removeEventListener(`click`, () => {
        });
      }
    };
  }
}
