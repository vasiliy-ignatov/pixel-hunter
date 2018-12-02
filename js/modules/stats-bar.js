import {getElementFromTemplate} from './util.js';

const getStatsBar = (game) => {
  const data = game.answers;
  const template = `<ul class="stats">
    ${data.map((item) => {
    if (item.answer === 0) {
      return `<li class="stats__result stats__result--wrong"></li>`;
    } else {
      return `<li class="stats__result stats__result--correct"></li>`;
    }
  })
    .join(``)}
    ${new Array(10 - data.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}

  </ul>`;

  const element = getElementFromTemplate(template);
  return element;
};

export default getStatsBar;
