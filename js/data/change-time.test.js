import {assert} from 'chai';
import {changeTime} from './change-time.js';
import {INITIAL_GAME} from './quest.js';

describe(`Check time changer`, () => {
  it(`should update time of the game`, () => {
    assert.equal(changeTime(INITIAL_GAME).time, 29);
  });

  it(`should not allow set non number value`, () => {
    const incorrectValue = Object.assign({}, INITIAL_GAME, {time: `undefined`});
    assert.throws(() => changeTime(incorrectValue), /Time should be of type number/);
  });
});
