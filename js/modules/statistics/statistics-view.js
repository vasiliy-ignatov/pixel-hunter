import AbstractView from './../abstract-view.js';
import InfoBarScreen from './../info-bar/info-bar-screen.js';
import StatusBarScreen from './../status-bar/status-bar-screen.js';
import {getGameResult} from './../../data/game-result.js';

export default class StatisticsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.infobar = new InfoBarScreen(this.game).template;
  }
  get template() {
    const gameResult = getGameResult(this.state.answers, this.state.lives);
    if (this.state.lives < 0) {
      return `<section class="result">
        <h2 class="result__title">Поражение</h2>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td class="stats-bar">
            </td>
            <td class="result__total"></td>
            <td class="result__total  result__total--final">fail</td>
          </tr>
        </table>
      </section>`;
    } else {
      return `<section class="result">
        <h2 class="result__title">Победа!</h2>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td class="stats-bar" colspan="2">
            </td>
            <td class="result__points">× 100</td>
            <td class="result__total">${gameResult.gamePoints}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">${gameResult.fastAnswers}<span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">${gameResult.fastPoints}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">${this.state.lives} <span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">${gameResult.livePoints}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Штраф за медлительность:</td>
            <td class="result__extra">${gameResult.slowAnswers}<span class="stats__result stats__result--slow"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">${gameResult.slowPoints}</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">${gameResult.allPoints}</td>
          </tr>
        </table>
      </section>`;
    }
  }
  render() {
    const element = super.render();
    element.prepend(this.infobar.element);

    const statsBar = element.querySelector(`.stats-bar`);
    statsBar.appendChild(new StatusBarScreen(this.state).element);
    return element;
  }
}
