import {assert} from 'chai';
import {INITIAL_GAME} from './quest.js';
import {calcGameResult} from './game-result.js';

describe(`Check game result`, () => {
  it(`should must not accept the wrong array length`, () => {
    const smallArr = [...new Array(9)].map(() => [0, 0]);
    const largeArr = [...new Array(25)].map(() => [0, 0]);

    assert.equal(calcGameResult([], 0), -1);
    assert.equal(calcGameResult(smallArr, 0), -1);
    assert.equal(calcGameResult(largeArr, 0), -1);
  });
  it(`should check average values`, () => {
    const anyArr = [...new Array(10)].map(() => {
      return {answer: 1, time: 15000};
    });
    assert.equal(calcGameResult(anyArr, INITIAL_GAME.lives), 1150);
  });
});
