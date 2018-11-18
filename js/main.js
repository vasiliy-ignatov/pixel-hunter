import {changeScreen} from './modules/util.js';
import introScreen from './modules/01-intro-screen.js';

// import greetingScreen from './modules/02-greeting-screen.js';
// import rulesScreen from './modules/03-rules-screen.js';
// import gameFirstScreen from './modules/04-game-1-screen.js';
// import gameSecondScreen from './modules/05-game-2-screen.js';
// import gameThirdScreen from './modules/06-game-3-screen.js';
// import {statsScreen} from './modules/07-stats-screen.js';

const Game = {
  init: () => {
    changeScreen(introScreen);
  }
};

document.addEventListener(`DOMContentLoaded`, Game.init);
