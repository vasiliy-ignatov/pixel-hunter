import {assert} from 'chai';
import {changeLevel} from './change-level.js';
import {INITIAL_GAME} from './quest.js';

describe(`Check level changer`, () => {
  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 10).level, 10);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, /Level should not be negative value/);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, undefined).level, /Level should be of type number/);
  });
});
