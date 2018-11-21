import {changeScreen} from './modules/util.js';
import introScreen from './modules/01-intro-screen.js';

const Game = {
  init: () => {
    changeScreen(introScreen);
  }
};

document.addEventListener(`DOMContentLoaded`, Game.init);
