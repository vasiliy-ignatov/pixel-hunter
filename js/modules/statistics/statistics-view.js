import AbstractView from './../abstract-view.js';
import {getInfoBar} from './../info-bar/info-bar-screen.js';
import {getStatusBar} from './../status-bar/status-bar-screen.js';
import {calcGameResult} from './../../data/game-result.js';

export default class StatisticsView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }
  get template() {
    const gameResult = calcGameResult(this.game.answers, this.game.lives);
    if (this.game.lives < 0) {
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
            <td class="result__total">${gameResult.levelPoints}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">0 <span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">50</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">${this.game.lives} <span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">100</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Штраф за медлительность:</td>
            <td class="result__extra">0 <span class="stats__result stats__result--slow"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">-100</td>
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
    element.prepend(getInfoBar(this.game));

    const section = element.querySelector(`section`);
    section.appendChild(getStatusBar(this.game));
    return element;
  }
}
