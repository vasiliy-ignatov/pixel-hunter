import {changeTime} from '../data/change-time.js';
const ONE_SECOND = 1000;

export default class Timer {
  constructor(state) {
    this.game = state;
  }
  tick() {
    this.game = changeTime(this.game);
    this.onTick();
  }
  onTick() {
  }
  start() {
    this.timer = setTimeout(() => {
      this.tick();
      this.start();
    }, ONE_SECOND);
  }
  stop() {
    clearTimeout(this.timer);
  }
  get value() {
    return this.game.time;
  }
}
