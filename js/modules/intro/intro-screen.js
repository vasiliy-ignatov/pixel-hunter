import Application from './../application.js';
import IntroView from './intro-view.js';

export default class IntroScreen {
  getIntroView() {
    const template = new IntroView();
    template.onClick = () => {
      Application.showGreeting();
    };

    return template.element;
  }
}
