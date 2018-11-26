import {assert} from 'chai';
import {changeLives} from './change-lives.js';
import {INITIAL_GAME} from './quest.js';

describe(`Check lives changer`, () => {
  it(`should update lives of the game`, () => {
    assert.equal(changeLives(INITIAL_GAME, 1).lives, 1);
    assert.equal(changeLives(INITIAL_GAME, 10).lives, 10);
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, -1).lives, /Lives should not be negative value/);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, undefined).lives, /Lives should be of type number/);
  });
});
