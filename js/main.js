import {changeScreen} from './modules/util.js';
import {getIntroScreen} from './modules/intro/intro-screen.js';

const Game = {
  init: () => {
    changeScreen(getIntroScreen());
  }
};

document.addEventListener(`DOMContentLoaded`, Game.init);
