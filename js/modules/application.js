import IntroScreen from './intro/intro-screen.js';
import GreetingScreen from './greeting/greeting-screen.js';
import RulesScreen from './rules/rules-screen.js';
import GameModel from './game-model.js';
import GameScreen from './game/game-screen.js';
import StatisticsScreen from './statistics/statistics-screen.js';
import {adaptServerData} from './../data/data-adapter.js';

const content = document.querySelector(`#main`);

const changeScreen = (node) => {
  content.innerHTML = ``;
  content.appendChild(node);
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let questData;

export default class Application {
  static showIntro() {
    const intro = new IntroScreen();
    changeScreen(intro.element);

    window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => {
        questData = adaptServerData(data);
      })
      .then(() => Application.showGreeting())
      .catch((err) => {
        throw new Error(`Возникла ошибка при загрузке ` + err);
      });
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    changeScreen(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    changeScreen(rules.element);
  }

  static showGame(userName) {
    const model = new GameModel(questData, userName);
    const gameScreen = new GameScreen(model);
    changeScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static updateGame(model) {
    const gameScreen = new GameScreen(model);
    changeScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(stats) {
    const statistics = new StatisticsScreen(stats);
    changeScreen(statistics.element);
  }
}
