import StatisticsView from './statistics-view.js';

export default class StatisticsScreen {
  constructor(stats) {
    this.stats = stats;
  }
  getStatsView() {
    const template = new StatisticsView(this.stats);

    return template.element;
  }
}
