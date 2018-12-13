import Application from './../application.js';
import GreetingView from './greeting-view.js';

export default class GreetingScreen {
  getGreetingView() {
    const template = new GreetingView();
    template.onClick = () => {
      Application.showRules();
    };

    return template.element;
  }
}
