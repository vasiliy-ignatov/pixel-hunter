import Application from './../application.js';
import RulesView from './rules-view.js';

export default class RulesScreen {
  constructor() {
    this.template = new RulesView();
    this.element = this.template.element;

    this.template.onInputChange = () => {
      const button = this.element.querySelector(`button.rules__button`);
      const input = this.element.querySelector(`.rules__input`);
      this.inputValue = input.value;

      if (this.inputValue.trim().length && (button.disabled === true)) {
        button.disabled = false;
      } else if (this.inputValue.trim().length === 0) {
        button.disabled = true;
      }
    };
    this.template.onButtonClick = () => {
      Application.showGame(this.inputValue);
    };
  }
}
