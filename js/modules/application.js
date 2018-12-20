import IntroScreen from './intro/intro-screen.js';
import GreetingScreen from './greeting/greeting-screen.js';
import RulesScreen from './rules/rules-screen.js';
import GameModel from './game-model.js';
import GameScreen from './game/game-screen.js';
import StatisticsScreen from './statistics/statistics-screen.js';
import Loader from './loader.js';

const content = document.querySelector(`#main`);

const changeScreen = (node) => {
  content.innerHTML = ``;
  content.appendChild(node);
};

let questData;

export default class Application {
  static showIntro() {
    const intro = new IntroScreen();
    changeScreen(intro.element);

    Loader.loadData()
      .then((data) => {
        questData = data;
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

  static showStats(model) {
    const userName = model.userName;
    Loader.saveResults(model.state, userName)
      .then(() => Loader.loadResults(userName))
      .then((data) => {
        changeScreen(new StatisticsScreen(data).element);
      })
      .catch((err) => {
        throw new Error(`Возникла ошибка при загрузке ` + err);
      });
    // console.log(model.state, userName);
    // const statistics = new StatisticsScreen(stats);
    // changeScreen(statistics.element);
  }
}
