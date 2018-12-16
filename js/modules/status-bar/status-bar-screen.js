import StatusBarView from './status-bar-view.js';

export default class StatusBarScreen {
  constructor(state) {
    this.state = state;
    this.template = new StatusBarView(this.state);
    this.element = this.template.element;
  }
}
