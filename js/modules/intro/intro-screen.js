import Application from './../application.js';
import IntroView from './intro-view.js';

export default class IntroScreen {
  constructor() {
    this.template = new IntroView();
    this.element = this.template .element;
    this.template.onClick = () => {
      Application.showGreeting();
    };
  }
}
