const ONE_SECOND = 1000;
const INIT_TIMER_VALUE = 30;

export default class Timer {
  constructor() {
    this._val = INIT_TIMER_VALUE;
  }
  tick() {
    this._val -= 1;
    this.onTick();
  }
  onTick() {
  }
  start() {
    this.timer = setTimeout(() => {
      this.start();
      this.tick();
    }, ONE_SECOND);
  }
  stop() {
    this._val = INIT_TIMER_VALUE;
    clearTimeout(this.timer);
  }
  get value() {
    return this._val;
  }
}
