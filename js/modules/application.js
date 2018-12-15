import {changeScreen} from './util.js';
import IntroScreen from './intro/intro-screen.js';
import GreetingScreen from './greeting/greeting-screen.js';
import RulesScreen from './rules/rules-screen.js';
import GameModel from './game-model.js';
import GameScreen from './game/game-screen.js';
import StatisticsScreen from './statistics/statistics-screen.js';

export default class Application {
  static showIntro() {
    const intro = new IntroScreen();
    changeScreen(intro.element);
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
    const model = new GameModel(userName);
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
