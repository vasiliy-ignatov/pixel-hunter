import {assert} from 'chai';
import {changeTime} from './change-time.js';
import {INITIAL_GAME} from './quest.js';

describe(`Check time changer`, () => {
  it(`should update time of the game`, () => {
    assert.equal(changeTime(INITIAL_GAME, 1).time, 1);
    assert.equal(changeTime(INITIAL_GAME, 10).time, 10);
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => changeTime(INITIAL_GAME, -1).time, /Time should not be negative value/);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => changeTime(INITIAL_GAME, undefined).time, /Time should be of type number/);
  });
});
