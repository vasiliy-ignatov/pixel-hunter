import Application from './../application.js';
import RulesView from './rules-view.js';

export default class RulesScreen {
  getRulesView() {
    const template = new RulesView();
    const button = template.element.querySelector(`button.rules__button`);
    const input = template.element.querySelector(`.rules__input`);

    template.onInputChange = () => {
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

    return template.element;
  }
}
