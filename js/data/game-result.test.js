import {assert} from 'chai';
import {getGameResult} from './game-result.js';

describe(`Check game result`, () => {
  it(`should must not accept the wrong array length`, () => {
    const smallArr = [...new Array(9)].map(() => {
      return {answer: 1, time: 0};
    });
    const largeArr = [...new Array(25)].map(() => {
      return {answer: 1, time: 0};
    });

    assert.equal(getGameResult([], 0), 0);
    assert.equal(getGameResult(smallArr, 0), 0);
    assert.equal(getGameResult(largeArr, 0), 0);
  });
  it(`should result with average values`, () => {
    const anyArr = [...new Array(10)].map(() => {
      return {answer: 1, time: 15};
    });
    assert.equal(getGameResult(anyArr, 3).allPoints, 1150);
  });
  it(`should result with bad time`, () => {
    const anyArr = [...new Array(10)].map(() => {
      return {answer: 1, time: 9};
    });
    assert.equal(getGameResult(anyArr, 0).allPoints, 500);
  });
  it(`should result with good time and 0 lives`, () => {
    const anyArr = [...new Array(10)].map(() => {
      return {answer: 1, time: 25};
    });
    assert.equal(getGameResult(anyArr, 0).allPoints, 1500);
  });
  it(`should result with good time and 2 lives`, () => {
    const anyArr = [...new Array(10)].map(() => {
      return {answer: 1, time: 25};
    });
    assert.equal(getGameResult(anyArr, 2).allPoints, 1600);
  });
});
