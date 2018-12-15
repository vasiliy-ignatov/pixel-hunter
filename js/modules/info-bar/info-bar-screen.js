import InfoBarView from './info-bar-view.js';
import Application from './../application.js';

export default class InfoBarScreen {
  constructor(state) {
    this.state = state;
  }
  getInfoBarView() {
    const template = new InfoBarView(this.state);
    template.onClick = () => {
      Application.showIntro();
    };

    return template;
  }
}
