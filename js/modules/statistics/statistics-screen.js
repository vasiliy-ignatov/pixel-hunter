import StatisticsView from './statistics-view.js';

export default class StatisticsScreen {
  constructor(stats) {
    this.stats = stats;
    this.template = new StatisticsView(this.stats);
    this.element = this.template.element;
  }
}
