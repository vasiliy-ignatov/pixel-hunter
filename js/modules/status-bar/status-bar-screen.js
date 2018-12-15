import StatusBarView from './status-bar-view.js';

export default class StatusBarScreen {
  constructor(state) {
    this.state = state;
  }
  getStatusBarView() {
    const template = new StatusBarView(this.state);

    return template.element;
  }
}
