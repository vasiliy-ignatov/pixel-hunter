import {INITIAL_GAME} from './../data/quest.js';
import {changeLevel} from './../data/change-level.js';
import {changeAnswer} from './../data/change-answer.js';
import {changeLives} from './../data/change-lives.js';


export default class GameModel {
  constructor(data, userName) {
    this.levels = data;
    this.userName = userName;
    this.restart();
  }
  get state() {
    return Object.freeze(this._state);
  }
  decreaseLife() {
    this._state = changeLives(this._state, this._state.lives - 1);
  }
  takeAnswer(val, time) {
    this._state = changeAnswer(this._state, {'answer': val, 'time': time});
  }
  hasNextLevel() {
    return this.levels[this._state.level + 1];
  }
  nextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }
  getCurrentLevel() {
    return this.levels[this._state.level];
  }
  isDead() {
    return this._state.lives < 0;
  }
  restart() {
    this._state = INITIAL_GAME;
  }
}
