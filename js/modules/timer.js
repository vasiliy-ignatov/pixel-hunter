const ONE_SECOND = 1000;

export default class Timer {
  constructor() {
    this._val = 0;
  }
  tick() {
    this._val += 1;
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
    this._val = 0;
    clearTimeout(this.timer);
  }
  get value() {
    return this._val;
  }
}
