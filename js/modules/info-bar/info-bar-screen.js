import InfoBarView from './info-bar-view.js';
import Application from './../application.js';

export default class InfoBarScreen {
  constructor(state) {
    this.state = state;
    this.template = new InfoBarView(this.state);
    this.template.onClick = () => {
      Application.showIntro();
    };
  }
}
