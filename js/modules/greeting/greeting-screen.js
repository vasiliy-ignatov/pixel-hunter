import Application from './../application.js';
import GreetingView from './greeting-view.js';

export default class GreetingScreen {
  constructor() {
    this.template = new GreetingView();
    this.element = this.template.element;

    this.template.onClick = () => {
      Application.showRules();
    };
  }
}
