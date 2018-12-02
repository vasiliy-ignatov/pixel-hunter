import {assert} from 'chai';
import {calcGameResult} from './game-result.js';

describe(`Check game result`, () => {
  it(`should must not accept the wrong array length`, () => {
    const smallArr = [...new Array(9)].map(() => {
      return {answer: 1, time: 0};
    });
    const largeArr = [...new Array(25)].map(() => {
      return {answer: 1, time: 0};
    });

    assert.equal(calcGameResult([], 0), 0);
    assert.equal(calcGameResult(smallArr, 0), 0);
    assert.equal(calcGameResult(largeArr, 0), 0);
  });
  it(`should result with average values`, () => {
    const anyArr = [...new Array(10)].map(() => {
      return {answer: 1, time: 15000};
    });
    assert.equal(calcGameResult(anyArr, 3), 1150);
  });
  it(`should result with bad time`, () => {
    const anyArr = [...new Array(10)].map(() => {
      return {answer: 1, time: 20001};
    });
    assert.equal(calcGameResult(anyArr, 0), 500);
  });
  it(`should result with good time and 0 lives`, () => {
    const anyArr = [...new Array(10)].map(() => {
      return {answer: 1, time: 9999};
    });
    assert.equal(calcGameResult(anyArr, 0), 1500);
  });
  it(`should result with good time and 2 lives`, () => {
    const anyArr = [...new Array(10)].map(() => {
      return {answer: 1, time: 9999};
    });
    assert.equal(calcGameResult(anyArr, 2), 1600);
  });
});
